import csv
import json

# CSVを読み込んでJavaScriptデータを生成
with open('formation_all.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    data = list(reader)

# 走者状況と打球/プレーの組み合わせを抽出
patterns = []
runner_play_map = {}

for row in data:
    runner = row['走者状況']
    play = row['打球/プレー']
    condition = row['守備条件']
    
    # キーを生成（走者状況 + 打球/プレー）
    key = f"{runner}_{play}"
    if condition:
        key += f"_{condition}"
    
    # movements を生成
    movements = {
        1: {'desc': row['ピッチャー']},
        2: {'desc': row['キャッチャー']},
        3: {'desc': row['ファースト']},
        4: {'desc': row['セカンド']},
        5: {'desc': row['サード']},
        6: {'desc': row['ショート']},
        7: {'desc': row['レフト']},
        8: {'desc': row['センター']},
        9: {'desc': row['ライト']}
    }
    
    pattern_data = {
        'id': key,
        'runner': runner,
        'play': play,
        'condition': condition,
        'name': f"{runner} - {play}" + (f" ({condition})" if condition else ""),
        'imageUrl': row['画像URL'],
        'articleUrl': row['記事URL'],
        'movements': movements
    }
    
    patterns.append(pattern_data)
    
    if runner not in runner_play_map:
        runner_play_map[runner] = []
    runner_play_map[runner].append({'play': play, 'condition': condition, 'id': key})

# JavaScriptファイルを生成
with open('data_all.js', 'w', encoding='utf-8') as f:
    f.write('// 全190パターンのフォーメーションデータ\n')
    f.write('const allFormationData = ')
    f.write(json.dumps(patterns, ensure_ascii=False, indent=2))
    f.write(';\n\n')
    
    f.write('// 走者状況別の打球/プレー一覧\n')
    f.write('const runnerPlayMap = ')
    f.write(json.dumps(runner_play_map, ensure_ascii=False, indent=2))
    f.write(';\n')

print(f"Generated data_all.js with {len(patterns)} patterns")
print(f"Runner situations: {list(runner_play_map.keys())}")
