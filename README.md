



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
```

### 数据集格式
```
[
	{
		"title": "Title",
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