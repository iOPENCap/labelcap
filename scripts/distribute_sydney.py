# distribute_sydney

reserve_old = False     # 是否保留原有的 caption 文件

'''
dataset_sydney_modified.json 格式
(与 dataset_nwpu_zh.json 格式相同，只是少了 filepath 字段)

{
    "images":[
        {
            "filename": "1.tif", 
            "split": "train", 
            "imgid": 30800, 
            "sentids": [154000, 154001, 154002, 154003, 154004], 
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

# set base dir
os.chdir(os.path.dirname(os.path.abspath(__file__)))

en_file = json.load(open('../public/data/server/datasets/captions/dataset_sydney_modified.json', 'r'))
zh_file = open('../public/data/server/datasets/captions/cap_zh/sydney.txt_zh.txt')

captions_en = en_file['images']
captions_zh = zh_file.readlines()
# 去掉末尾的换行符
captions_zh = [line.strip() for line in captions_zh]

captions = []
zh_index = 0

for raw_caption in captions_en:

    caption = {}
    caption['dataset'] = 'Sydney'
    caption['title'] = raw_caption['filename']
    caption['imgid'] = raw_caption['imgid']
    # check filepath
    assert os.path.exists(f'../public/data/server/datasets/images/Sydney/{raw_caption["filename"]}')
    caption['filepath'] = [f'/data/server/datasets/images/Sydney/{raw_caption["filename"]}']
    
    # 加入英文描述
    sentences_en = []
    for sentence in raw_caption['sentences']:
        sentences_en.append(sentence['raw'])
    caption['caption_en'] = sentences_en
    
    # 加入中文描述，中文与英文条数相等
    caption['caption_zh'] = captions_zh[zh_index:(zh_index + len(sentences_en))]
    zh_index += len(sentences_en)

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
        json.dump(caption, open(f'{origin_dir}/Sydney_{title}.json', 'w'), ensure_ascii=False)