import os
import json
import time

CACHE_DIR = "./cache"
CACHE_TTL = 60  # saniye

if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)


def get_cache_path(key):
    return os.path.join(CACHE_DIR, f"{key}.json")


def get_cache(key):
    path = get_cache_path(key)

    if not os.path.exists(path):
        return None

    with open(path, "r") as f:
        data = json.load(f)

    if time.time() - data["timestamp"] > CACHE_TTL:
        return None

    return data["value"]


def set_cache(key, value):
    path = get_cache_path(key)

    with open(path, "w") as f:
        json.dump({
            "timestamp": time.time(),
            "value": value
        }, f)