~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Pietro Albini's Sphinx themes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This repository contains the source code of my own base Sphinx_ theme,
released under the MIT license. Feel free to include it in your projects, even
if I ask you to customize them a little bit in order to avoid users confusion.

How to use the theme in your projects
=====================================

The package itself provides an utility function to get the absolute path of
the theme's directory. So, you can put this simple snippet in your
documentation's ``conf.py``::

   import pietroalbini_sphinx_themes
   html_theme_path = [pietroalbini_sphinx_themes.themes_path()]

   html_theme = "pietroalbini"

You don't need to provide a Pygments style, because the whole highlightling
thing is handled by the theme itself.

Customizing the theme
=====================

It's recommended to customize the theme when you use it, because even changing
the titles' font and links' color will give to your documentation an unique
feel.

The easiest way to customize it is to create a theme which inherits from the
main one, and changing the options::

   [theme]
   inherit = pietroalbini

   [options]
   accent_color = #004dc2
   night_accent_color = #5c9dff

   titles_font = DejaVu

Then you can put in your stylesheet other customizations you want to apply, and
the code to import the font you want to use for the titles.

Available theme options
=======================

Here there is a list of all the available theme options:

* **accent_color**: the main color used by the theme, for links and keywords in
  the code boxes
* **night_accent_color**: the same as *accent_color*, but used in the night
  (dark) mode
* **titles_font**: name of the font used in titles and headings

.. _Sphinx: http://sphinx-doc.org/
