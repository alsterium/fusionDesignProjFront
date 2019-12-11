# fusionDesignProjFront
## Vagrantを用いる場合
### インストールと設定
1. VirtualBoxを [ここ](https://www.virtualbox.org/wiki/Downloads)からダウンロード
2. Vagrantを[ここ](https://www.vagrantup.com/downloads.html)からダウンロード
3. コマンドプロンプトかPowershellを開き、vagrant plugin install vagrant-hostsupdater でプラグインを取得
4. このリポジトリをcloneして"vm"ディレクトリに移動
5. "vm"ディレクトリ中で、コマンドプロンプトかPowershellを管理者権限で開く
6. "Vagrant up" をタイプしてVMが起動するまで待つ
7. vmが起動したら、"local.devel.com"で"html"中にあるhtmlファイルにアクセスできる
### マシンのシャットダウン
シェルで"vagrant halt"をタイプ
## Node.jsでhttp-serverを用いる場合
1. Node.jsをインストール
2. "npm install -g http-server"を実行し、http-serverをインストール
3. プロジェクトルートディレクトリでhttp-serverを起動
4. localhost:8080にブラウザでアクセスするとプロジェクトルートのindex.htmlが表示される
### Demo
[https://alsterium.github.io/fusionDesignProjFront/html/moc.html](https://alsterium.github.io/fusionDesignProjFront/html/moc.html)
