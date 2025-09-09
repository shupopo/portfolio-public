# 廣島周平 - ポートフォリオサイト

自動化・効率化エンジニアのプロフェッショナルポートフォリオサイト

## GitHubでの公開手順（GitHub Pages使用）

### 1. ローカルプロジェクトの作成

```bash
# プロジェクトフォルダを作成
mkdir portfolio
cd portfolio

# 提供したファイルを配置し、依存関係をインストール
npm install

# 動作確認
npm run dev
```

### 2. GitHubリポジトリの作成と公開

```bash
# Gitの初期化
git init

# ファイルをステージング
git add .

# 初回コミット
git commit -m "feat: ポートフォリオサイト初回作成"

# GitHubの新しいリポジトリに接続（事前にGitHub上でリポジトリ作成）
git remote add origin https://github.com/shupopo/portfolio.git

# プッシュ
git push -u origin main
```

### 3. GitHub Pages の設定

1. GitHubリポジトリページで **Settings** タブを開く
2. 左サイドバーの **Pages** を選択
3. **Source** を **Deploy from a branch** に設定
4. **Branch** を **gh-pages** に設定（GitHub Actionsが作成します）
5. **Save** をクリック

### 4. 自動デプロイの確認

- mainブランチにコミット・プッシュすると自動でGitHub Actionsが実行
- **Actions** タブで進行状況を確認可能
- デプロイ完了後、`https://shupopo.github.io/portfolio/` でアクセス可能

## ファイル構成

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions設定
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages + GitHub Actions

## 更新方法

コンテンツを更新したい場合：

```bash
# ファイルを編集後
git add .
git commit -m "update: コンテンツ更新"
git push

# → 自動でビルド・デプロイされます
```

## カスタマイズ

### 1. プロフィール情報
`src/app/page.tsx` の `profileData` を編集

### 2. スキル情報
`src/app/page.tsx` の `skills` 配列を編集

### 3. プロジェクト情報
`src/app/page.tsx` の `projects` 配列を編集

### 4. カラーテーマ
`tailwind.config.js` で色を調整

## 主な機能

- ✅ レスポンシブデザイン
- ✅ スムーズスクロールアニメーション  
- ✅ スキルフィルタリング機能
- ✅ プロジェクトカテゴリ分け
- ✅ お問い合わせフォーム
- ✅ SEO最適化
- ✅ GitHub Pages自動デプロイ

## トラブルシューティング

### ビルドエラーが発生した場合
```bash
# ローカルでビルドテスト
npm run build

# エラー内容を確認して修正後、再コミット
```

### GitHub Actionsが失敗した場合
1. GitHubリポジトリの **Actions** タブでエラー内容を確認
2. 主な原因：依存関係の問題、構文エラー、ビルド設定
3. 修正後に再プッシュで自動的に再実行

## ライセンス

MIT License

## 作成者

廣島周平 - 自動化・効率化エンジニア