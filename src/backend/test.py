#!/usr/bin/env python3

class Test(Exception):
    def __init__(self, message):
        super().__init__(message)

if __name__ == '__main__':
    try:
        import terafds
    except ModuleNotFoundError as e:
        raise Test('test')
