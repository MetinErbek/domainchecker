from fastapi import FastAPI, Query
import requests
from cache import get_cache, set_cache
from dotenv import load_dotenv
import os


app = FastAPI()
load_dotenv()
TLDs = ["com", "net", "io"]

def check_domain_api(name):
    tlds = ",".join(TLDs)
    url = f"{os.getenv('API_URL')}?name={name}&tlds={tlds}&key={os.getenv('API_KEY')}"
    headers = {
        "X-API-Key": f"{os.getenv('API_KEY')}",
    }
    response = requests.get(url, headers=headers)
    return response.json()


@app.get("/check-domain")
def check_domain(name: str = Query(...)):
    name = name.lower().strip()
    cache_key = f"domain_{name}"
    cached = get_cache(cache_key)
    if cached:
        return {
            "source": "cache",
            "data": cached
        }
    
    result = check_domain_api(name)


    set_cache(cache_key, result)

    return {
        "source": "api",
        "data": result
    }