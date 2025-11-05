# realkana

i've used the site [realkana](https://realkana.com) and really enjoyed it. however, around a month ago (as of writing), there was an update which i didn't really like. so i decided to put a mirror of the old version - primarily for my own (occasional) use.

## how i downloaded the files
the files here are all from the Internet Archive's Wayback Machine. unforutunately, not all the saves had the correct pages, so it took some time to find good ones. i downloaded the files with:
```bash
wget --mirror --page-requisites --convert-links --adjust-extension \
     --span-hosts --domains=web.archive.org \
     https://web.archive.org/web/20250614083908/https://realkana.com/...
```
then, i had to do some cleaning up to make resource links point to the right relative path as well as remove injected js, which, as it turns out, actually breaks the use of the site on the wayback machine site. this seems to be a known issue with how their code is injected into module scripts.

## pages left
i only saved the most important pages for now, so there's still some left
```txt
./hiragana/double
./hiragana/words
./katakana/double
./katakana/words
./blog/*
./app
```

## new features(?!)
since i have the code, it could be cool to add new features
- dark mode
- saved scores for right/wrong
- infinite mode