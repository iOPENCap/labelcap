# 将上一版本的 nwpu 数据集的 captions 适配到最新格式

# 变化如下：
# - 删除 filename 属性，改为 filepath，
#   以 server 目录为起点，该图片的相对路径，
#   且类型改为列表，以便适配多个图片。

# 最新格式（2023-10-08）为：
'''
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
'''

import os
import json
from tqdm import tqdm

for user in os.listdir('../public/data'):
    if user == 'server':
        continue

    user_dir = f'../public/data/{user}/captions'
    origin_dir = user_dir + '/origin/'

    for file in tqdm(os.listdir(origin_dir)):
        old = json.load(open(origin_dir + file, 'r'))
        filepath:str = old['filepath'][0]
        old['filepath'] = ['/data/server/' + filepath]

        json.dump(old, open(origin_dir + file, 'w'))