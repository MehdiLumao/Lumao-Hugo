#!/bin/bash
# From https://gist.github.com/xapax/1c150ac42fc48f09a67c68e4841ed364

filename=$(basename "$1")
dirname=$(dirname "$1")

extension="${filename##*.}"
filename_without_extension="${filename%.*}"

sed -i -e 's/<p>//g' $1
sed -i -e 's/<\/p>/\n/g' $1

sed -i -e 's/<h1>/# /g' $1
sed -i -e 's/<\/h1>//g' $1

sed -i -e 's/<h2>/## /g' $1
sed -i -e 's/<\/h2>//g' $1

sed -i -e 's/<h3>/### /g' $1
sed -i -e 's/<\/h3>//g' $1

sed -i -e 's/<h4>/#### /g' $1
sed -i -e 's/<\/h4>//g' $1

sed -i -e 's/<strong>/**/g' $1
sed -i -e 's/<\/strong>/**/g' $1
sed -i -e 's/<br \/>//g' $1

sed -i -e 's/<ul>//g' $1
sed -i -e 's/<\/ul>//g' $1

sed -i -e 's/<ol>//g' $1
sed -i -e 's/<\/ol>//g' $1

sed -i -e 's/<li>/- /g' $1
sed -i -e 's/<\/li>//g' $1

sed -i -e 's/<pre>/```\n/g' $1
sed -i -e 's/<\/pre>/```\n/g' $1

sed -i -e 's/<a href="/[](/g' $1
sed -i -e 's/<\/a>//g' $1

sed -i -e 's/&amp;/\&/g' $1
sed -i -e 's/&quot;/"/g' $1
sed -i -e 's/&gt;/>/g' $1
sed -i -e 's/&lt;/</g' $1
sed -i -e 's/&nbsp;//g' $1

sed -i -e 's/\[code\]/```/g' $1
sed -i -e 's/\[\/code\]/```/g' $1
sed -i -e 's/\[code lang="javascript"\]/```javascript/g' $1
sed -i -e 's/\[code lang="bash"\]/```bash/g' $1
sed -i -e 's/\[code lang="php"\]/```php/g' $1
sed -i -e 's/\[code lang="python"\]/```python/g' $1
sed -i -e 's/\[code lang="html"\]/```html/g' $1
sed -i -e 's/\[code lang="js"\]/```javascript/g' $1
sed -i -e 's/\[code lang="c"\]/```c/g' $1
sed -i -e 's/\[code lang="jade"\]/```jade/g' $1
sed -i -e 's/\[code lang="css"\]/```css/g' $1

sed -i -e 's/\[code language="html"\]/```html/g' $1
sed -i -e 's/\[code language="js"\]/```javascript/g' $1
sed -i -e 's/\[code language="php"\]/```php/g' $1
sed -i -e 's/\[code language="css"\]/```css/g' $1
sed -i -e 's/\[code language="bash"\]/```bash/g' $1

sed -i -e 's/<code>/```/g' $1
sed -i -e 's/<\/code>/```/g' $1
