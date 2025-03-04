```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
</head>

<body>
  <div>Some content</div>
  <p>Another paragraph</p>
  <p>Another paragraph</p>
  <p>Another paragraph</p>
  <div>More div content</p>
  <span>Span element</span>
  <script>
    function findMostFrequentTag() {
      const allElements = document.getElementsByTagName('*');
      const tagCount = {};
      for (let i = 0; i < allElements.length; i++) {
        const tagName = allElements[i].tagName;
        if (tagCount[tagName]) {
          tagCount[tagName]++;
        } else {
          tagCount[tagName] = 1;
        }
      }
      let mostFrequentTag = null;
      let maxCount = 0;
      for (const tag in tagCount) {
        if (tagCount[tag] > maxCount) {
          mostFrequentTag = tag;
          maxCount = tagCount[tag];
        }
      }
      return mostFrequentTag;
    }
    const mostFrequent = findMostFrequentTag();
    console.log(`The most frequent tag is: ${mostFrequent}`);
  </script>
</body>

</html>
```
