"""
    pietroalbini_sphinx_themes
    Utility tools for my own Sphinx themes

    Copyright (c) 2015 Pietro Albini <pietro@pietroalbini.io>
    Released under the MIT license
"""

import os


def _base_path():
    return os.path.abspath(os.path.dirname(__file__))


def themes_path():
    """Get the path of my Sphinx themes"""
    return os.path.join(_base_path(), "themes")


with open(os.path.join(_base_path(), "version")) as f:
    __version__ = f.read().strip()
