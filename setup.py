"""
    pietroalbini-sphinx-themes's setup file

    Copyright (c) 2015 Pietro Albini <pietro@pietroalbini.io>
    Released under the MIT license
"""

import setuptools


with open("pietroalbini_sphinx_themes/version") as f:
    version = f.read().strip()

with open("README.rst") as f:
    long_description = f.read()


setuptools.setup(
    name = "pietroalbini-sphinx-themes",
    version = version,
    license = "MIT",

    url = "https://github.com/pietroalbini/sphinx-themes",
    author = "Pietro Albini",
    author_email = "pietro@pietroalbini.io",

    description = "Sphinx themes for my own projects",
    long_description = long_description,

    zip_safe = False,
    include_package_data = True,
    packages = [
        "pietroalbini_sphinx_themes",
    ],

    install_requires = [
        "sphinx",
    ],
)
