# 将原本所有未标注 caption 集中在一个文件
# 改为每个图片的 caption 分别是一个文件

import json
import os

for user in os.listdir('../public/data'):
    if user == 'server':
        continue

    user_dir = f'../public/data/{user}/captions'
    origin_dir = user_dir + '/origin/'
    os.makedirs(origin_dir)

    raw = json.load(open(user_dir + '/raw.json', 'r'))
    for item in raw:
        json.dump(item, open(f'{origin_dir}/{item["filename"]}.json', 'w'))
