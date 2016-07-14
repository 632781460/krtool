# 前端工具
**krtool是一个自动打版本，从最新tag切分支的工具**

## 安装

	npm install -g krtool

## 使用
	
### 打版本

	krtool tag <version> 
*注*：[version](http://semver.org/lang/zh-CN/)默认自动检测，commit中包含[提交规范](https://gitlab.corp.36kr.com/f2e/kr-codestyle/blob/master/36kr/angular1/CONTRIBUTE.md)中type为feat类型，则是一个[minor](http://semver.org/lang/zh-CN/)版本；否则是一个[patch](http://semver.org/lang/zh-CN/)版本；

### 自动从最新tag切分支

	krtool hotfix <branchname>
*注*：**branchname**默认为**krfix**