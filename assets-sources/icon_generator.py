#!/usr/bin/env python3

# Adapted from https://github.com/loo-y/weibo-extend/blob/main/icon_generator.py

import os
import sys
from PIL import Image
from PIL import ImageOps


def usage():
    print('usage: ./icon_generator.py <src_image>')


def create_folder(dir_path):
    if not os.path.exists(dir_path):
      os.makedirs(dir_path)


def main(filename):
    create_folder('icon')
    create_folder('icon-disabled')
    icon_sizes = (16, 24, 32, 48, 128)
    src_image = Image.open(filename, 'r')

    for size in icon_sizes:
        icon = src_image.resize((size, size), Image.LANCZOS)
        icon.save('icon/{size}.png'.format(size=size))

    for size in icon_sizes:
        img = Image.open(f'icon/{size}.png')
        img = img.convert('LA').convert('RGBA')
        img.save('icon-disabled/{size}.png'.format(size=size))

if __name__ == '__main__':
    if len(sys.argv) != 2:
        usage()
        sys.exit(1)

    filename = sys.argv[1]
    main(filename)
