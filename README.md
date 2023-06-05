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

