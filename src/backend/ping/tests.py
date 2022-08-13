#!/usr/bin/env python3

import traceback

if __name__ == '__main__':
    try:
        test = 1 / 0
    except:
        print(traceback.format_exc().splitlines()[-1])
