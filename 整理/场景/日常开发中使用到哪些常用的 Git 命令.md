# 日常开发中使用到哪些常用的 Git 命令

在日常生活的开发工作中，以下是一些常用的 Git 命令：

## 配置相关

**git config：**

- 用途：用于配置 Git 的各种参数，如用户姓名、邮箱等基本信息，这些信息会关联到每一次提交记录。
- 示例：
    - `git config --global user.name "Your Name"`：设置全局的用户名，这个名字会出现在你提交的代码记录中。
    - `git config --global user.email "your.email@example.com"`：设置全局的邮箱，用于标识提交者身份，方便团队协作时追踪提交来源。

## 仓库初始化与克隆

**git init**：

- 用途：在本地创建一个新的 Git 仓库。通常用于开始一个全新的项目，将当前目录初始化为一个可以被 Git 管理的仓库。
- 示例：在一个新的项目文件夹下执行git init，就会在这个文件夹中创建一个隐藏的.git文件夹，用于存储仓库的相关信息。


**git clone：**

- 用途：用于从远程仓库（如 GitHub、GitLab 等）克隆代码到本地。这是获取已有项目代码的常用方法。
- 示例：git clone [远程仓库地址]，例如 `git clone https://github.com/user/repository.git`，这样就可以把名为repository的远程仓库代码克隆到本地。


## 状态查看与文件管理

**git status：**

- 用途：查看工作区（本地仓库目录）的状态，包括文件的修改、新增、删除情况，以及文件是否已被添加到暂存区等信息。
- 示例：在项目目录下执行git status，可以看到类似“Changes not staged for commit”（未暂存的修改）或者“Untracked files”（未跟踪的文件）等状态信息。

**git add：**

- 用途：将工作区的文件修改添加到暂存区，告诉 Git 哪些文件的变化需要被包含在下一次提交中。
- 示例：
    - git add [文件名]：比如git add main.py，将main.py文件的修改添加到暂存区。
    - git add .：将当前目录下所有文件的修改添加到暂存区，但不包括新添加的未跟踪文件。
    - git add -A：添加所有文件的修改，包括新添加的未跟踪文件。

**git rm：**

- 用途：用于从工作区和暂存区删除文件，并且在下次提交时记录这个删除操作。
- 示例：git rm [文件名]，例如git rm old_file.txt，将old_file.txt文件从工作区和暂存区删除。

## 提交与历史记录查看

**git commit：**

- 用途：将暂存区的内容提交到本地仓库，形成一个新的版本记录，需要添加提交注释来描述这次提交的内容。
- 示例：git commit -m "Initial commit"，其中-m选项后面的内容就是提交注释，用于简要说明本次提交做了什么。

**git log：**

- 用途：查看提交历史记录，包括每次提交的作者、日期、提交注释和提交哈希值等信息，方便追踪项目的开发历程。
- 示例：执行git log后，会以逆序（最新的提交在最上面）显示提交记录，如可以看到提交哈希值像commit 123456789abcdef...，作者名字，日期和提交注释等内容。


## 分支管理

**git branch：**

- 用途：用于创建、查看和删除分支。分支是 Git 中非常重要的概念，可以让开发者在不影响主分支的情况下进行功能开发或者实验。
- 示例：
    - git branch：查看本地所有分支，当前分支会以*标识。
    - git branch [分支名]：创建一个新的分支，例如git branch new-feature，会创建一个名为new - feature的新分支。
    - git branch -d [分支名]：删除一个已经合并的分支，比如git branch -d old-branch。

**git checkout：**

- 用途：用于切换分支或者恢复工作区文件。可以让你在不同分支之间切换，以进行不同的开发工作。
- 示例：
    - git checkout [分支名]：切换到指定分支，如git checkout master，会将工作区切换到master分支。
    - git checkout -b [新分支名]：创建一个新分支并切换到该分支，例如git checkout -b dev-branch，相当于同时执行了git branch dev - branch和git checkout dev - branch两个操作。


## 远程仓库操作

**git remote：**

- 用途：用于管理远程仓库的信息，如添加、查看和删除远程仓库的关联。
- 示例：
    - git remote -v：查看已经配置的远程仓库及其对应的推送和拉取地址，会显示类似`origin https://github.com/user/repository.git (fetch)`和`origin https://github.com/user/repository.git (push)`的信息。
    - git remote add [远程仓库名] [远程仓库地址]：添加一个新的远程仓库关联，例如`git remote add origin https://github.com/user/new - repository.git`，这里origin是远程仓库名，后面是仓库地址。

**git push：**

- 用途：将本地仓库的分支和提交记录推送到远程仓库，使得远程仓库的内容与本地保持同步。
- 示例：git push [远程仓库名] [本地分支名]，如git push origin master，将本地master分支推送到名为origin的远程仓库。

**git pull：**
- 用途：从远程仓库拉取最新的分支和提交记录到本地仓库，并自动尝试合并到当前分支。
- 示例：git pull [远程仓库名] [本地分支名]，通常简单地使用git pull（如果已经配置好远程仓库和分支追踪），就可以拉取并合并远程仓库对应的分支到本地当前分支。


## 标签管理

**git tag**

- 用途：用于给特定的提交打上标签，方便标记重要的版本号、里程碑等。比如在发布软件版本时，可以用标签来标识版本号。
- 示例：
    - git tag -a v1.0 -m "Version 1.0 release"：创建一个带有注释的标签v1.0，注释内容为Version 1.0 release。
    - git tag：查看所有标签，会列出所有已创建的标签名称。
    - git push origin [标签名]：将本地标签推送到远程仓库，例如git push origin v1.0，这样远程仓库也能看到这个标签。


## 暂存操作

**git stash**

- 用途：当你正在进行一项工作，但需要切换分支去处理其他紧急事情时，可以使用git stash将当前工作区和暂存区的修改暂存起来。之后可以再恢复这些暂存的修改继续工作。
- 示例：
    - git stash：暂存当前的修改。
    - git stash list：查看所有暂存记录，会显示类似stash@{0}: WIP on master: 1234567...的信息，其中stash@{0}是暂存记录的索引。
    - git stash pop：恢复最近一次暂存的修改，并将其从暂存列表中删除。如果有多个暂存记录，可以使用git stash apply stash@{1}（这里stash@{1}是指定的暂存记录索引）来恢复特定的暂存记录。


## 合并与变基

**git merge**

- 用途：用于将一个分支的修改合并到另一个分支。比如将开发分支（dev）的功能合并到主分支（master）。
- 示例：
首先切换到要合并到的分支，例如git checkout master，然后执行git merge dev，就可以将dev分支的修改合并到master分支。合并过程中可能会出现冲突，需要手动解决冲突后再提交。

**git rebase**

- 用途：和git merge类似，也是用于整合分支修改，但git rebase是将提交历史“变基”，使得提交历史更加线性。一般在希望保持提交历史整洁的情况下使用。
- 示例：假设在feature分支开发了新功能，现在想将其变基到master分支的最新提交上。首先切换到feature分支，如git checkout feature，然后执行git rebase master。在变基过程中，如果出现冲突，需要手动解决冲突，然后继续执行git rebase --continue。

**git cherry-pick**

- 用途：它允许你从一个分支中选择一个或多个提交（commit），然后将这些提交应用到当前分支。简单来说，就是 “摘取” 其他分支上的特定提交，并把它们的更改应用到你正在工作的分支上。
- 示例：
    - 场景示例：假设你有一个主分支（master）和一个开发分支（dev）。在dev分支上，开发人员发现并修复了一个紧急的软件漏洞，这个修复提交为commit - A。现在，你希望把这个修复也应用到master分支，而不是将整个dev分支合并到master，因为dev分支可能还包含其他未经过充分测试的功能。
    - 操作步骤：首先切换到master分支（git checkout master），然后使用git cherry - pick <commit - A的哈希值>。这样，commit - A中的更改就会被应用到master分支，就好像这个修复是在master分支上直接进行的一样。这在保持主分支稳定的同时，能够快速地将关键的修复传播到需要的分支。


## 撤销操作

**git reset**

- 用途：用于撤销提交或者将暂存区的文件修改回退。可以根据不同的参数实现不同程度的撤销。
- 示例：
    - git reset [文件名]：将暂存区中指定文件的修改撤销，例如git reset main.py，如果main.py已经添加到暂存区，这个命令会将它从暂存区移除，恢复到未暂存的状态。
    - git reset --hard [提交哈希值或分支名]：彻底回退到指定的提交或者分支状态，这个操作会清除工作区和暂存区的所有未提交修改，例如git reset --hard HEAD~1会回退到上一个提交的状态，HEAD~1表示当前提交的前一个提交，使用时要非常谨慎。

**git revert**

- 用途：用于撤销已经提交的修改，但会创建一个新的提交来记录这个撤销操作，这样可以保留完整的提交历史。
- 示例：git revert [提交哈希值]，例如git revert 123456789abcdef...，会创建一个新的提交来撤销指定提交所做的修改。
