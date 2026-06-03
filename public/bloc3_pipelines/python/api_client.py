import requests

class FXClient:
    def __init__(self, base_url="https://api.frankfurter.app"):
        self.base_url = base_url

    def get_latest_rate(self, base="EUR", target="USD"):
        response = requests.get(f"{self.base_url}/latest?from={base}&to={target}")
        response.raise_for_status()
        data = response.json()
        return data["rates"][target]
