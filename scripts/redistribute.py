# 收集所有用户未标注的数据集，
# 然后重新随机平均分发。

import os
import json

json_sum = []
for user in os.listdir('../public/data'):
    if user == 'server':
        continue

    user_dir = f'../public/data/{user}/captions'
    origin_dir = user_dir + '/origin/'

    if not os.path.exists(origin_dir):
        continue

    for file in os.listdir(origin_dir):
        item = json.load(open(origin_dir + file, 'r'))
        json_sum.append(item)
    
# 将数据集随机均分为 11 份
import random

n = 11

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

    for caption in sublist:
        title = caption['title']
        json.dump(caption, open(f'{origin_dir}/{title}.json', 'w'))