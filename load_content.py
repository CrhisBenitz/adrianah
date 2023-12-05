import glob
import sys
import subprocess as sp
import numpy as np
import re

def func_fill_html(dict_blanks,html_file_blank,html_file):

    f = open(html_file_blank)
    text_chunk = f.read()
    f.close()

    for key, value in dict_blanks.items():
        text_chunk = text_chunk.replace(key+"_blank",value)

    with open(html_file, 'w') as f:
        f.write(text_chunk)

def get_title_desc(path_to_txt):

    f = open(path_to_txt)
    text_chunk = f.read()
    f.close()
    title_a,desc_a = re.findall("Title: (.*)",text_chunk), re.findall("Desc: (.*)",text_chunk,re.DOTALL)
    title, desc = "", ""
    if title_a:
        title = title_a[0]
    if desc_a:
        desc = desc_a[0]
    return title, desc

full_path = "/Users/adriana/Desktop/website/adrianah/docs/"

pages = sorted([pages.split("/")[-1] for pages in glob.glob(full_path+"contenido/"+"*")])
nav_bar_string = ""
htmls = []
ddick = {p:{} for p in pages}

for page in pages:
    if page!="home":
        new_generic_html = full_path + page+".html"
        nav_bar_string = nav_bar_string + "<li><a href=" + page.replace(" ","_")+".html" + ">" + page +  "</a></li>"+"\n"
        htmls.append(new_generic_html)

for page in pages:
    images_main_string = ""

    cols = sorted([c.split("/")[-1] for c in glob.glob(full_path+"contenido/"+page+"/*")])
    ncols = len(cols)

    ims = [sorted([c.split("/")[-1] for c in glob.glob(full_path+"contenido/"+page+"/"+col+"/*.jpg")]) for col in cols]
    nims = [len(im) for im in ims]
    for i in range(ncols):
        images_main_string = images_main_string + "<div class=\"column\">\n"
        for j in range(nims[i]):
            title,desc = get_title_desc(full_path+"contenido/"+page+"/"+cols[i]+"/"+ims[i][j].split(".")[0]+".txt")
            sims = "<article class=\"thumb\" >\n"
            sims = sims + "<a href=\"contenido/" + page + "/" + cols[i] + "/" + ims[i][j] + "\" class=\"image\">"
            #sims = sims + "<img src=\"contenido/" + page.replace(" ","\ ") + "/" + cols[i] + "/" + ims[i][j] +"\" alt=\"\" /></a>\n"
            sims = sims + "<img src=\"contenido/" + page + "/" + cols[i] + "/" + ims[i][j] +"\" alt=\"\" /></a>\n"
            sims = sims + "<h2>" + title + "</h2>\n"
            sims = sims + "<p>" + desc + "</p>\n"
            sims = sims + "</article>"
            images_main_string = images_main_string + sims
        images_main_string = images_main_string + "</div>\n"


    ddick[page]["images_main"] = images_main_string
    ddick[page]["navbar_list"] = nav_bar_string


for page in pages:
    if page!="home":
        func_fill_html(ddick[page], full_path+"generic_blank.html", full_path+page.replace(" ","_")+".html")
    else:
        func_fill_html(ddick[page], full_path+"index_blank.html", full_path+"index.html")
