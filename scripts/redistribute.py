# 收集所有用户未标注的数据集，
# 然后重新随机平均分发。

# labelcap 可以识别的数据集格式为（2023-10-08）：
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

json_sum = []
n = 0
for user in os.listdir('../public/data'):
    if user == 'server':
        continue

    n += 1
    user_dir = f'../public/data/{user}/captions'
    origin_dir = user_dir + '/origin/'

    if not os.path.exists(origin_dir):
        continue

    for file in os.listdir(origin_dir):
        item = json.load(open(origin_dir + file, 'r'))
        json_sum.append(item)
    
# 将数据集随机均分为 n 份（n=用户数）
import random

random.shuffle(json_sum)
length = len(json_sum)

size = length // n
sublists = [json_sum[i:i+size] for i in range(0, length, size)]
if len(sublists) > n:
    sublists[-2] += sublists[-1]
    sublists = sublists[:-1]

i = 0
# 分发到每个用户
for user in os.listdir('../public/data'):
    if user == 'server':
        continue

    sublist = sublists[i]
    i += 1

    user_dir = f'../public/data/{user}/captions'
    origin_dir = user_dir + '/origin'

    if not os.path.exists(origin_dir):
        os.makedirs(origin_dir)
    
    # 删除 origin_dir 中所有原有文件
    for file in os.listdir(origin_dir):
        os.remove(origin_dir + '/' + file)

    for caption in sublist:
        title = caption['title']
        json.dump(caption, open(f'{origin_dir}/{title}.json', 'w'))