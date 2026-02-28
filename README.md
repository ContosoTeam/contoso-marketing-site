![Main branch CI](https://img.shields.io/badge/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81_CI-passing-brightgreen)
![CodeQL セキュリティ分析](https://img.shields.io/badge/CodeQL_%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E5%88%86%E6%9E%90-passing-brightgreen)
![OpenSSF Scorecard](https://img.shields.io/badge/openssf_scorecard-7.1-brightgreen)
![OpenSSF Best Practices](https://img.shields.io/badge/openssf_best_practices-silver-silver)
![License](https://img.shields.io/badge/%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-13.4-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)

# Contoso マーケティングサイト

Next.js と TypeScript で構築された、企業向けマーケティング・製品紹介 Web サイトです。

## 機能

- 製品ランディングページ
- CMS 統合ブログ
- お問い合わせフォーム（メール送信機能付き）
- ニュースレター登録
- アナリティクスとトラッキング
- SEO 最適化

## クイックスタート

```bash
npm install
npm run dev
```

## デプロイ

GitHub Actions 経由で Azure Static Web Apps にデプロイされます。

## 技術スタック

- Next.js 13.4 / TypeScript
- Tailwind CSS
- SendGrid（メール）
- Mailchimp（ニュースレター）
- Azure Static Web Apps

## ライセンス

このプロジェクトは [MIT ライセンス](LICENSE)の下で公開されています。

## セキュリティ

脆弱性を発見された場合は、[セキュリティポリシー](SECURITY.md)をご確認ください。
