# 从 server 目录中获取原始 nwpu 数据集
# 平均随机分发给每个用户

reserve_old = True     # 是否保留原有的 caption 文件

'''
dataset_nwpu_en.json 格式：

{
    "airplane": [
        {
            "filename": "airplane_001.jpg",
            "imgid": 30800,
            "split": "train",
            "raw": "Two larger planes and a smaller plane parked on the open area .",
            "sentids": 154000,
            "raw_1": "Two larger airplanes and one smaller airplane are parked at the airport .",
            "sentids_1": 154001,
            "raw_2": "Two airplanes and one smaller plane were parked in the open space .",
            "sentids_2": 154002,
            "raw_3": "Three airplanes are parked on the open place .",
            "sentids_3": 154003,
            "raw_4": "There are three planes on the ground .",
            "sentids_4": 154004
        },
        ...
    ],
    "airport": [
        ...
    ],
    ...
}

dataset_nwpu_zh.json 格式：

{
    "images":[
        {
            "filename": "airplane_001.jpg", 
            "split": "train", 
            "imgid": 30800, 
            "sentids": [154000, 154001, 154002, 154003, 154004], 
            "filepath": "airplane", 
            "sentences": [
                {
                    "tokens": ["两架", "大", "飞机", "和", "一架", "小", "飞机", "停", "在", "空地", "上"], 
                    "raw": "两架大飞机和一架小飞机停在空地上。", 
                    "imgid": 30800, 
                    "sentid": 154000
                },
                ...
            ]
        },
        ...
    ]
}

'''

import os
import json
import random

file_en = json.load(open('../public/data/server/datasets/captions/dataset_nwpu_en.json', 'r'))
file_zh = json.load(open('../public/data/server/datasets/captions/dataset_nwpu_zh.json', 'r'))

captions_en = []
for classname, classdata in file_en.items():
    captions_en.extend(classdata)

captions_zh = file_zh['images']

captions = []

for caption_en, caption_zh in zip(captions_en, captions_zh):
    assert caption_en['imgid'] == caption_zh['imgid']

    caption = {}
    caption['title'] = caption_en['filename']
    caption['imgid'] = caption_en['imgid']
    caption['filepath'] = [f'/data/server/datasets/images/NWPU-RESISC45/{caption_zh["filepath"]}/{caption_zh["filename"]}']
    
    # 加入中文描述
    sentences_zh = []
    for sentence in caption_zh['sentences']:
        sentences_zh.append(sentence['raw'])
    caption['caption_zh'] = sentences_zh
    
    # 加入英文描述
    sentences_en = [caption_en['raw']]
    for i in range(1, 5):
        sentences_en.append(caption_en[f'raw_{i}'])
    caption['caption_en'] = sentences_en

    captions.append(caption)

# 随机打乱
random.shuffle(captions)

# 均分为 n 份（n 为用户数）

# 求出 n 的值，n 为 '../public/data' 目录下的目录数 - 1
n = len(os.listdir('../public/data')) - 1

size = len(captions) // n
sublists = [captions[i:i+size] for i in range(0, len(captions), size)]
if len(sublists) > n:
    sublists[-2] += sublists[-1]
    sublists = sublists[:-1]

# 分发给每个用户
i = 0
# 分发到每个用户
for user in os.listdir('../public/data'):
    if user == 'server':
        continue

    sublist = sublists[i]
    i += 1

    user_dir = f'../public/data/{user}/captions'
    origin_dir = user_dir + '/origin'

    if os.path.exists(origin_dir) and not reserve_old:
        # 删除目录
        os.system(f'rm -rf {origin_dir}')

    if not os.path.exists(origin_dir):
        os.makedirs(origin_dir)

    for caption in sublist:
        title = caption['title']
        json.dump(caption, open(f'{origin_dir}/NWPU_{title}.json', 'w'))