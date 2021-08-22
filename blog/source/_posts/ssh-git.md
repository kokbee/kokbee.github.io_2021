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

<!-- more -->

<b>SSH 등록방법</b>
=====
## 1. ssh-keygen 생성
```bash
$ ssh-keygen -t ed25519 -C "your_email@example.com" 
```

## 2. key 확인
```bash
$ cat /home/{user}/.ssh/id_ed25519.pub
```

## 3. ssh 등록
    3-1. 등록을 위해서 Github login -> 자신의 프로필 -> settings

{% asset_img img_center git_settings.png 150 80 "git_settings" "git_settings" %}
<br />

    3-2. ssh and gpg keys 클릭

{% asset_img img_center git_settings_ssh.png 150 80 "git_settings_ssh" "git_settings_ssh" %}
<br />

    3-3. New SSH KEY 클릭

{% asset_img img_center git_ssh.png 300 50 "git_ssh" "git_ssh" %}
<br />

    3-4. ssh key에 아까 확인한 ket 복사&붙혀넣기

{% asset_img img_center git_ssh_add.png 350 80 "git_ssh_add" "git_ssh_add" %}
<br />

    3-5. 생성확인 

{% asset_img img_center git_ssh_add_key.png 250 80 "git_ssh_add_key" "git_ssh_add_key" %}
<br />

## 4. SSH 접속 설정
 공개키를 알아서 할 수 있는 건, 대응하는 개인키를 가진 사용자에게 인증 권한을 부여하는 일이며
 공개키가 공개된다고 보안 상 위험은 없다고 봐도 무방 그럼 이제 등록한 키가 잘 동작하는지 확인해볼 차례

    4-1.  ~/.ssh에서 아래 내용을 입력하여 config 파일을 생성

```bash
Host github.com
IdentityFile ~/.ssh/id_ed25519
User git
```

    4-2. 접속 테스트

{% asset_img img_center git_ssh_test.png 150 80 "git_ssh_test" "git_ssh_test" %}
<br />

    4-3.접속 성공!

{% asset_img img_center git_ssh_success.png "git_ssh_success" "git_ssh_success" %}
<br />

## 5. SSH를 사용한 Github 사용법

    1. ssh clone

```
git clone git@github.com:username/repoename.git
```
<br />

    2. remote add

```
git remote add git@github.com:username/repoename.git
```
<br />

## 이렇게 설정해주면 끝 ✌

--------------------

<br /><br />

## Tip. 만약 기존에 키를 사용하고 있다면..
 이 경우는 근무환경이 회사 또는 외부와 협력하는 사람의 경우 ssh가 이미 있을 수도 있다. (나도 회사에서 이미 사용..)
 그럼 이경우에는 키를 바궈까며 사용해야함.. 그래서 예시로 작성

멀티 어카운트 생성
=====

#### 1 ~/.ssh/config 에서 아래 내용을 입력

```bash
Host test
  IdentityFile ~/.ssh/id_ed25519_test/id_ed25519_test // 분리하기위해 폴더로 나눠서 사용
  User git
  Port 22
  HostName github.com
```
<br />

#### 2. git 사용법


    1. ssh clone

```
git clone git@test:username/repoename.git
```
<br />

    2. remote add

```
git remote add git@test:username/repoename.git
```
<br />

## 이방식으로 설정해주면 협업가능. ㅎㅎ