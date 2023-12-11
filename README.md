
## Usage
### 启动服务器
1. 创建一个 tmux session，运行服务器
   ```
   tmux new -s nextjs-server
   yarn dev
   ```
2. 运行 nginx，将 8080 端口映射到 3000 端口
   ```
   nginx -s quit
   nginx
   ```

### 更换数据集
1. 点击 stat 页面下的 export 按钮，导出当前已标注的数据集到 public/data/server/exports 下
2. 将数据集放在 `data` 目录下
3. 将 captions 的格式转换为（转换脚本写在 scripts 目录下）：
   ```
   [
   	{
   		"title": "Title",
		"dataset": "Sydney",
   		"filepath": [
   			"Path/Of/Image1.jpg", 
   			"/data/server/NWPU-RESISC45/airplane/airplane_001.jpg",
   			...
   		],
   		"imgid": 888,
   		"caption_zh": [
   			"中文描述1",
   			"中文描述2",
   			...
   		],
   		"caption_en": [
   			"English caption 1",
   			"English caption 2",
   			...
   		]
   	},
   	...
   ]
   ```
4. 将数据集分发到每个用户的 origin 目录下。同样将脚本写在 scripts 目录。



## 代码
### API声明

**auth**

```
Request {
	user: User,
}

Response {
	authed: boolean,
}
```

**get-captions**

```typescript
Request {
	user: string,
}

Response {
	itemList:  CaptionItem[],
}
```

**post-captions**

```
Request {
	captionItem: Captionitem,
	user: string,
}

Response {
	Null
}
```

**get-history**

```
Request {
	user: string,
}

Response {
	itemList: CaptionItem[]
}