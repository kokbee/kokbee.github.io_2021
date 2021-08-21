---
title: "[Github] 토큰 인증 로그인"
date: 2021-08-22 00:54:26
thumbnail: 
tags: [ github, git, ssh ]
categories: 
    - Tech
---

개인 레포를 생성하고 push 를 하려고 했더니 에러 메시지 뿜뿜함...

이유는 8월 13일 부로 push, clone, pull 시 비밀번호 대신 토큰을 사용하게 변경 되었기 때문.
그래서 Github 에서 토큰을 생성 및 작업할 수 있도록 글을 작성한다.

기존에는 http로 클론을 떳지만, 이제는 ssh로 떠야하기에 스탭별로 정리


### 1. ssh-keygen 생성

    $ ssh-keygen -t ed25519 -C "your_email@example.com"

### 2. key 확인

    $ cat /home/{user}/.ssh/id_ed25519.pub

### 3. ssh 등록

    등록을 위해서 Github login -> 자신의 프로필 -> settings

![github](/blog/source/_posts/ssh-git/git_settings.png)
