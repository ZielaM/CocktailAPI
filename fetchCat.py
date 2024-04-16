import requests

def main():
    url: str = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i="
    foundList: list[str] = []
    for i in range(11000, 20000):
        if i % 100 == 0:
            print(f"Checking {i}")
        response = requests.get(f"http://{url}{i}")
        if response.status_code != 200:
            continue
        if response.json()["drinks"] is None:
            continue
        resp: str = response.json()["drinks"][0]["strCategory"]
        if resp is None:
            continue
        if resp not in foundList:
            foundList.append(resp)
            with open("categories.txt", "a") as f:
                f.write(f"{resp}\n")
            print(f"Found: {resp} at {i}")
            
if __name__ == "__main__":
    main()