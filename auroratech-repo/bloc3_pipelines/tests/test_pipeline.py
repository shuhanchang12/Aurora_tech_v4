import unittest
from python.api_client import FXClient
from unittest.mock import patch

class TestAPIClient(unittest.TestCase):
    @patch('python.api_client.requests.get')
    def test_get_latest_rate(self, mock_get):
        mock_get.return_value.json.return_value = {
            "amount": 1.0,
            "base": "EUR",
            "date": "2023-01-01",
            "rates": {"USD": 1.10}
        }
        client = FXClient()
        rate = client.get_latest_rate()
        self.assertEqual(rate, 1.10)

if __name__ == '__main__':
    unittest.main()
