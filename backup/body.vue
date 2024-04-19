<script setup lang="ts">
import { onMounted, ref } from "vue";
import { drawPolygon, isPointInsidePolygon } from "./utiles.js";
import front from './body.png'
import back from './body2.png'

const colorPicker = ref([
    { name: '外伤', color: '#3399FF' },
    { name: '出血', color: '#9DBB61' },
    { name: '皮疹', color: '#F2DCDA' },
    { name: '针痕', color: '#F59D56' }
])
const currentColor = ref('')
const currentPickerColor = ref('')

const bodyParts = ref([
    {
        name: "leftArm",
        polygonPoints: [
            { x: 14, y: 326 },
            { x: 49, y: 301 },
            { x: 108, y: 121 },
            { x: 128, y: 195 },
            { x: 59, y: 369 },
            { x: 37, y: 381 },
        ],
    },
    {
        name: "head",
        polygonPoints: [
            { x: 155, y: 55 },
            { x: 190, y: 88 },
            { x: 215, y: 75 },
            { x: 230, y: 52 },
            { x: 219, y: 12 },
            { x: 195, y: 0 },
            { x: 165, y: 13 },
        ],
    },
]);

const points = ref<any[]>([])

const isFront = ref(true);
let imageURL = front;
const reverse = () => {
    canvasRef.value.style.transform = isFront.value ? 'rotateY(180deg)' : 'rotateY(360deg)';
    isFront.value = !isFront.value
    imageURL = isFront.value ? front : back;
    points.value = []
    setTimeout(() => {
        drawCanvs()
    }, 500);
}

const boxRef = ref()
const canvasRef = ref()

let offsetX = ref(0)
let offsetY = ref(0)
let isDragging = ref(false);
let isPickerDragging = ref(false);
let currentDragDiv = ref<HTMLElement | null>(null);

const checkPart = (x, y) => {
    var rect = canvasRef.value.getBoundingClientRect();
    var mouseX = x - rect.left;
    var mouseY = y - rect.top;
    var clickedPoint = { x: mouseX, y: mouseY };
    const part = bodyParts.value.find(item => isPointInsidePolygon(clickedPoint, item.polygonPoints))
    console.log('===', part)
    return part;
}

const drawCanvs = () => {
    const ctx = canvasRef.value.getContext("2d");

    const img = new Image();
    img.src = imageURL;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);

        bodyParts.value.forEach(item => {
            drawPolygon(ctx, item.polygonPoints)
        })
    };

};

onMounted(() => {
    drawCanvs();

    canvasRef.value?.addEventListener("click", (event) => {
        if (!currentColor.value) alert('先选择')
        var rect = canvasRef.value.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;
        console.log("点击位置：", mouseX, mouseY);
        const part = checkPart(event.clientX, event.clientY)

        if (part) {
            points.value.push({
                left: mouseX + 'px',
                top: mouseY + 'px',
                backgroundColor: currentColor.value
            })
        }
    })

    document.addEventListener('mousemove', function (event) {
        var mouseX = event.clientX;
            var mouseY = event.clientY;
        if (isDragging.value && currentDragDiv.value) {
            currentDragDiv.value.style.left = mouseX - offsetX.value + 'px';
            currentDragDiv.value.style.top = mouseY - offsetY.value + 'px';
        }
        if (isPickerDragging.value && currentDragDiv.value) {
            currentDragDiv.value.style.left = mouseX + 'px';
            currentDragDiv.value.style.top = mouseY + 'px';
        }
    });

    document.addEventListener('mouseup', function (event) {
        isDragging.value = false;
        currentDragDiv.value = null;
        if (isPickerDragging.value) {
            const rect = boxRef.value.getBoundingClientRect()
            const pickerDragElement = document.querySelector('.picker-drag')
            points.value.push({
                left: event.clientX - rect.left + 'px',
                top: event.clientY - rect.top + 'px',
                backgroundColor: currentPickerColor.value
            })
            isPickerDragging.value = false;
            pickerDragElement && document.body.removeChild(pickerDragElement)
        }
    });
});

const handlePicker = (event, picker) => {
    isPickerDragging.value = true;
    const boxRect = boxRef.value.getBoundingClientRect()
    const newDiv = document.createElement('div');
    newDiv.style.position = 'fixed';
    newDiv.className = 'picker-drag'
    newDiv.style.width = '16px';
    newDiv.style.height = '16px';
    newDiv.style.backgroundColor = picker.color;
    currentPickerColor.value = picker.color;
    newDiv.style.left = event.clientX+ 'px'
    newDiv.style.top = event.clientY + 'px'
    newDiv.addEventListener('mousedown', function (e) {
        isDragging.value = true;
        currentDragDiv.value = newDiv; 
    });
    document.body.appendChild(newDiv);
    currentDragDiv.value = newDiv;
}

const handlePickerDrag = (event) => {
    isPickerDragging.value = true
    offsetX.value = event.offsetX 
    offsetY.value = event.offsetY 
    currentDragDiv.value = event.currentTarget
}

const handlePointDrag = (event) => {
    const boxRect = boxRef.value.getBoundingClientRect()
    isDragging.value = true;
    offsetX.value = event.offsetX + boxRect.left;
    offsetY.value = event.offsetY + boxRect.top;
    currentDragDiv.value = event.currentTarget;
}
</script>

<template>
    <div class="picker-box">
        <div v-for="picker in colorPicker" :key="picker.name">
            <div class="picker" :style="{ backgroundColor: picker.color }" @click="currentColor = picker.color" @mousedown="handlePicker($event, picker)"></div>
            <p class="noselect">{{ picker.name }}</p>
        </div>
        <button @click="reverse" class="noselect">翻转</button>
    </div>
    <div id="myCanvasBox" ref="boxRef">
        <canvas id="myCanvas" width="400" height="600" ref="canvasRef"></canvas>
        <div class="dot" v-for="(point, index) in points" :key="index"
            :style="{ left: point.left, top: point.top, backgroundColor: point.backgroundColor }"
            @mousedown="handlePointDrag"></div>
    </div>
</template>

<style>
canvas {
    border: 1px solid black;
    transform-style: preserve-3d;
    transition: transform 1s;
}

#myCanvasBox {
    width: 400px;
    height: 600px;
    position: relative;
}

.dot {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.picker-box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.picker {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.picker-drag {
    position: fixed;
    width: 16px;
    height: 16px;
    /* left: 0;
    top: 0; */
    z-index: 100;
}


.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
