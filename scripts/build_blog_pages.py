import yaml
import os
import shutil

def build_directories(blog_data, blog_dir):
    """Builds the directories for the blog pages"""
    if not blog_data: return
    for category in blog_data:
        # Check if the directories named after the category.category exist. If not, create them.
        if not os.path.exists(os.path.join(blog_dir, category['permalink'].split('/')[-2])):
            os.makedirs(os.path.join(blog_dir, category['permalink'].split('/')[-2]))
        if 'subcategories' in category:
            build_directories(category['subcategories'], os.path.join(blog_dir, category['permalink'].split('/')[-2]))

def reset_directories(blog_dir):
    """Resets the directories for the blog pages"""
    for root, dirs, files in os.walk(blog_dir):
        for dir in dirs:
            shutil.rmtree(os.path.join(root, dir))

def build_page_templates(blog_data, blog_dir):
    """Builds the page templates for the blog pages"""
    if not blog_data: return
    for category in blog_data:
        if 'pages' in category:
            for page in category['pages'] and len(category['pages']) > 0:
                blog_page = \
f"""\
---
layout: default
title: {page['title']}
permalink: {category['permalink']}/{page['permalink']}
---

"""
                with open(os.path.join(blog_dir, category['permalink'].split('/')[-2], f"{page['permalink'].split('/')[-2]}.html"), 'w') as f:
                    f.write(blog_page)
        elif 'subcategories' in category:
            blog_home = \
f"""\
---
layout: default
title: {category['title']}
parent: {category['permalink'].split('/')[1]}
permalink: {category['permalink']}
---

<!-- Main Section-->
<section class="container py-3 " data-scroll-section>
    <!-- Page Content Goes Here -->

    <h1 class="display-3" data-scroll data-scroll-speed="2" data-scroll-position="top">Blog Posts</h1>
    <h3 data-scroll data-scroll-speed="2" data-scroll-position="top" class="align-items-center justify-content-center"><a class="text-decoration-none cursor-pointer align-middle" style="font-size: 1.5rem" href="{{{{ site.url }}}}{{{{ site.baseurl }}}}/{{{{ page.parent }}}}"><i class="fa-solid fa-angle-left"></i> Back</a> <small>|</small> {{{{ page.title }}}}</h3>

    {{% assign categories = nil %}}
    {{% for category in site.data.blog %}}
        {{% if category.permalink == "{category['permalink']}" %}}
            {{% assign categories = category.subcategories %}}
            {{% break %}}
        {{% endif %}}
    {{% endfor %}}
    {{% assign n = categories.size | divided_by: 4 %}}
    {{% assign rem = categories.size | modulo: 4 %}}
    {{% if rem > 0 %}}
    {{% assign n = n | plus: 1 %}}
    {{% endif %}}
    {{% for i in (0..n) %}}
        <div class="row mt-8">
            {{% assign m = i | times: 4 %}}
            {{% assign k = m | plus: 3 %}}
            {{% for j in (m..k) %}}
            {{% assign category = categories[j] %}}
            {{% if category %}}
                <div class="col align-self-start">
                    <a class="blog-category-card" href="{{{{ category.permalink }}}}">
                        <h4 style="font-size: 1.5rem;">{{{{ category.category }}}}</h4>
                        <small class="text-muted" style="font-size: 0.95rem">{{{{ category.description }}}}</small>
                        <i class="fa fa-arrow-right blog-category-card-icon" style="align-self: flex-end; margin-top: auto;"></i>
                    </a>
                </div>
            {{% endif %}}
            {{% endfor %}}
        </div>
    {{% endfor %}}

    <!-- /Page Content -->
</section>
"""
            with open(os.path.join(blog_dir, category['permalink'].split('/')[-2], "index.html"), 'w') as f:
                f.write(blog_home)
            build_page_templates(category['subcategories'], os.path.join(blog_dir, category['permalink'].split('/')[-2]))
        else:
            blog_home = \
f"""\
---
layout: default
title: {category['title']}
permalink: {category['permalink']}
---

<!-- Main Section-->
<section class="container py-3 " data-scroll-section>
    <!-- Page Content Goes Here -->

    <h1 class="display-3" data-scroll data-scroll-speed="2" data-scroll-position="top">Blog Posts</h1>
    <h3  data-scroll data-scroll-speed="2" data-scroll-position="top">{{{{ page.title }}}}</h3>
    <div class="row align-items-center justify-content-center mt-8" data-scroll data-scroll-position="bottom">
        <div class="col text-center">
            <h4 class="text-muted">No posts yet</h4>
        </div>
    </div>

    <!-- /Page Content -->
</section>
"""
            with open(os.path.join(blog_dir, category['permalink'].split('/')[-2], "index.html"), 'w') as f:
                f.write(blog_home)

if __name__ == '__main__':
    with open('../_data/blog.yml', 'r') as f:
        blog_data = yaml.safe_load(f)
    build_directories(blog_data, '../pages/blog')
    build_page_templates(blog_data, '../pages/blog')
    # reset_directories('../pages/blog')