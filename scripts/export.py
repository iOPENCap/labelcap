# 将所有人的标注**移动**到 public/data/server/exports 目录下

import os
import datetime

source_dir = '../public/data'
# 用当前时间命名导出目录
target_dir = f'../public/data/server/exports/{datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")}'

for user in os.listdir(source_dir):

    if user == 'server':
        continue

    user_dir = os.path.join(source_dir, user)
    user_capped_dir = os.path.join(user_dir, 'captions/new')
    user_export_dir = os.path.join(target_dir, user)

    if not os.path.exists(user_export_dir):
        os.makedirs(user_export_dir)
    
    # 移动
    os.system(f'mv {user_capped_dir}/* {user_export_dir}')
