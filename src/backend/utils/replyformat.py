class ReplyFormat:
    @staticmethod
    def status_200(result):
        self.response = {
            'status_code': 200,
            'message': 'success',
            'result': result
        }
        return self.response

    @staticmethod
    def status_400(message):
        self.response = {
            'status_code': 400,
            'message': message
        }
        return self.response

    @staticmethod
    def status_500(message):
        self.response = {
            'status_code': 500,
            'message': message
        }
        return self.response
