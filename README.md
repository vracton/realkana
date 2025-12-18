# realkana

i really enjoy the site [realkana](https://realkana.com). however, a few months ago, there was an update which changed some stuff that i liked. so, i decided to put up a mirror of the old version -- primarily for my own (occasional) use.

## how i downloaded the files
the files here are all from the Internet Archive's Wayback Machine. unfortunately, not all the saves had the correct pages, so it took some time to find good ones. i downloaded the files with (powershell):
```bash
wget --mirror --page-requisites --convert-links --adjust-extension \
     --span-hosts --domains=web.archive.org \
     https://web.archive.org/web/<timestamp>/https://realkana.com/...
```
then, i had to do some cleaning up to make resource links point to the right relative path as well as remove the wayback machine's injected js, which, as it turns out, actually breaks the use of the site on the wayback machine. this seems to be a known issue with how their code is injected into module scripts.

## pages left
i only saved some pages for now, so there's still some left
```txt
./hiragana/double
./hiragana/words
./katakana/double
./katakana/words
./blog/*
./app
```

## new features(?!)
since i have the code (albeit minified), it could be cool to add new features
- dark mode
- saved stats for right/wrong
- infinite mode