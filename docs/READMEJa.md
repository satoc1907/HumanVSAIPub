# HumanVSAIPub: Brain Tumor IDH Status Identification

A desktop application for testing and training identification of IDH mutation status in brain tumors using multi-modal MRI images.

![Application Interface](docs/images/main-screenshot.png)

## 概要 (Overview)

このアプリケーションは、医療専門家や研究者が脳腫瘍のIDH変異状態をMRI画像から識別する能力をトレーニングおよびテストするために設計されています。IDH変異状態は脳グリオーマの重要なバイオマーカーであり、患者の予後と治療計画に大きな影響を与えます。

This application is designed to help medical professionals and researchers train and test their ability to identify IDH mutation status in brain tumors using MRI imaging data. IDH mutation status is a critical biomarker for brain gliomas that significantly impacts patient prognosis and treatment planning.

プロジェクトは2つのElectronアプリケーションで構成されています：

1. **viteElectronTCGAtest**: 識別スキルのテスト用
2. **viteElectronTCGAtrain**: トレーニングと練習用

各アプリケーションは4つの異なるモダリティ（T1、T1CE、T2、FLAIR）で脳MRIスキャンを表示し、ユーザーに腫瘍のIDH変異状態を識別するよう求めます。

![Test Interface](docs/images/test-interface.png)
*テストインターフェース: IDH野生型の症例を表示*

![Training Interface](docs/images/training-interface.png)
*トレーニングインターフェース: ユーザー確認画面*

## 機能 (Features)

- マルチモーダルMRIスキャン（T1、T1CE、T2、FLAIR）の表示
- インタラクティブなクイズインターフェース
- 進捗状況の追跡
- 結果をJSONとしてエクスポート
- クロスプラットフォーム互換性のためにElectronとVue.jsで構築
- 医療画像の視覚化にNiiVueを使用

## インストール (Installation)

### 前提条件 (Prerequisites)

- Node.js (v14以上)
- npm (v6以上)

### セットアップ (Setup)

1. リポジトリをクローン:
   ```
   git clone https://github.com/yourusername/HumanVSAIPub.git
   cd HumanVSAIPub
   ```

2. 両方のアプリケーションの依存関係をインストール:
   ```
   # テストアプリケーション用
   cd viteElectronTCGAtest
   npm install
   
   # トレーニングアプリケーション用
   cd ../viteElectronTCGAtrain
   npm install
   ```

3. **重要:** 著作権の制約により、MRI画像データはこのリポジトリに含まれていません。以下が必要です:
   - 適切な脳MRIデータを取得する (NIFTIフォーマット: .niiまたは.nii.gz)
   - データを適切なディレクトリ構造に配置する (以下を参照)

### データセットアップ (Data Setup)

各アプリケーションで、以下のディレクトリ構造にデータを配置する必要があります:

```
/viteElectronTCGAtest/src/renderer/data/
└── [Case ID]/
    ├── T1.nii.gz
    ├── T1CE.nii.gz
    ├── T2.nii.gz
    └── FLAIR.nii.gz
```

同様に、トレーニングアプリケーション用:

```
/viteElectronTCGAtrain/src/renderer/data/
└── [Case ID]/
    ├── T1.nii.gz
    ├── T1CE.nii.gz
    ├── T2.nii.gz
    └── FLAIR.nii.gz
```

### JSON設定 (JSON Configuration)

各ケースのメタデータを含むJSONファイルも作成する必要があります。フォーマットは次の例に従ってください:

```json
[
  {
    "TCGA_name": "TCGA-****",
    "ID": "BraTS19_****",
    "IDH1_2": 0
  }
]
```

- `TCGA_name`: The Cancer Genome Atlasのケース識別子
- `ID`: MRIファイルを含むディレクトリ名と一致する識別子
- `IDH1_2`: 正解のIDH変異状態 (0 = 野生型, 1 = 変異型)

このファイルを以下の場所に保存します:
- `/viteElectronTCGAtest/src/renderer/data/jsons/TCGA_test_sampled_random0.json`
- `/viteElectronTCGAtrain/src/renderer/data/jsons/TCGA_train_sampled_random0.json`

## 使用方法 (Usage)

### アプリケーションの実行 (Running the Applications)

テストアプリケーションを実行:
```
cd viteElectronTCGAtest
npm run dev
```

トレーニングアプリケーションを実行:
```
cd viteElectronTCGAtrain
npm run dev
```

### 配布用のビルド (Building for Distribution)

テストアプリケーションをビルド:
```
cd viteElectronTCGAtest
npm run build
```

トレーニングアプリケーションをビルド:
```
cd viteElectronTCGAtrain
npm run build
```

プラットフォーム固有のビルド:
```
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

## 使い方 (How to Use)

1. テストまたはトレーニングアプリケーションを起動
2. ナビゲーションボタンを使用してケースを閲覧
3. 各ケースについて、4つのモダリティで表示されるMRI画像を検査
4. IDH変異状態に関する診断を選択
5. すべてのケースを完了して結果を受け取る
6. 最後に名前を入力して結果をJSONファイルとして保存

## 技術的詳細 (Technical Details)

- ElectronとVue.jsで構築
- 医療画像の視覚化にNiiVueライブラリを使用
- MRIデータはNIFTIフォーマットで読み込み
- 結果はJSONとして保存およびエクスポート

## ライセンス (License)

[ライセンス情報をここに挿入]

## 謝辞 (Acknowledgments)

- [Deluze](https://github.com/Deluze/electron-vue-template)によるオリジナルのElectron + Vueテンプレート
- 医療画像の視覚化のための[NiiVue](https://github.com/niivue/niivue)

## 免責事項 (Disclaimer)

このソフトウェアは研究および教育目的のみを意図しています。適切な検証なしに臨床的意思決定に使用すべきではありません。
