#push_data.py
import redis
import json
from new_data import new_data

redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)
contest_id = "123"
queue_key = f"contest_{contest_id}_queue"

for student in new_data:
    redis_client.rpush(queue_key, json.dumps(student))

