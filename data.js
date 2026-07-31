// Mock Academic Database for MultiModal Insight AI

const PAPERS = [
  {
    id: "clip-2021",
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    authors: "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Krueger, Ilya Sutskever",
    year: 2021,
    doi: "10.48550/arXiv.2103.00020",
    category: "Multimodal Representation",
    tags: ["CLIP", "Contrastive Learning", "Vision-Language", "Zero-Shot"],
    citationCount: 18450,
    readTime: "14 min read",
    status: "Processed",
    fileSize: "3.2 MB",
    abstract: "State-of-the-art computer vision systems are trained to predict a fixed set of predetermined object categories. We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations. Using a dataset of 400 million (image, text) pairs collected from the internet, we pre-train CLIP (Contrastive Language-Image Pre-training) to associate text snippets with images. CLIP transfers to over 30 existing computer vision datasets, matching the accuracy of a fully supervised ResNet-50 baseline on ImageNet without using any of the dataset's labeled training examples.",
    summaries: {
      abstract: "CLIP (Contrastive Language-Image Pre-training) introduces joint contrastive training on 400M internet visual-textual pairs. It enables flexible zero-shot transfer across multiple vision tasks by predicting cosine alignments between image embeddings and text prompts.",
      detailed: [
        { section: "1. Introduction", content: "Supervised vision models struggle with out-of-distribution shifts because they are confined to closed classification vocabularies. CLIP addresses this by learning raw natural language supervision directly from internet image-text caption distributions." },
        { section: "2. Joint Representation Space", content: "An image encoder (e.g. ResNet or Vision Transformer) and a text encoder (Transformer) map visual and textual inputs into a shared multi-dimensional latent coordinate embedding space." },
        { section: "3. Contrastive Objective", content: "The model is optimized to maximize the cosine similarity scores of the N correct (image, text) pairs in a batch while minimizing similarity for the N*(N-1) incorrect pairings." }
      ],
      beginner: "Imagine showing a child a picture of a dog and saying the word 'dog', and then showing a picture of a cat and saying 'cat'. Instead of just learning to label a few animals, the child learns the relationship between the sights they see and the words they hear. CLIP is trained this way: it reads millions of pictures and their captions from the web, learning to connect visual shapes with written descriptions. This lets it recognize new objects it has never officially seen before, just by matching them to prompt descriptions like 'a photo of a yellow bird'.",
      technical: "The shared embeddings are normalized, and the contrastive training objective computes visual features I_f and textual features T_f. The cosine similarity matrix score is optimized using a symmetric cross-entropy loss over similarity scores multiplied by a learned temperature parameter: loss = (CrossEntropy(sim * exp(t), axis=0) + CrossEntropy(sim * exp(t), axis=1)) / 2.",
      contributions: [
        "Replaced closed-set labels with open-vocabulary natural language prompts.",
        "Demonstrated scalable pre-training on a massive dataset of 400 million pairs.",
        "Established zero-shot transfer capabilities matching fully supervised baselines.",
        "Created a unified joint representation framework utilized by Stable Diffusion, Midjourney, and multimodal RAG search."
      ],
      methodology: "A batch of N (image, text) pairs is fed to their respective encoders. Visual features are extracted using ViT-B/32 or ResNet-50, and textual features are processed via a Transformer encoder. Both embeddings are projected into a joint latent dimension, L2-normalized, and a similarity score matrix is computed. The diagonal elements represent correct matches, which are maximized via contrastive loss.",
      results: "CLIP matches the zero-shot accuracy of a fully supervised ResNet-50 baseline on ImageNet (62.5% top-1 accuracy) without using any of ImageNet's training labels. It also demonstrates high resilience to natural distribution shifts, outperforming supervised models on ImageNet-A and ImageNet-R benchmarks.",
      futureWork: "Extending contrastive alignment to temporal domains (video-audio) and optimizing computational parameters during scaling runs.",
      limitations: [
        "Struggles with fine-grained visual classification tasks like counting objects or identifying specific model numbers.",
        "High computational costs and memory overhead during large batch-size contrastive training runs.",
        "Sensitive to prompt engineering templates, requiring wrappers like 'a photo of a [label]' to achieve optimal zero-shot accuracy."
      ]
    },
    figures: [
      {
        id: "fig-clip-1",
        caption: "Figure 1: Contrastive Language-Image Pre-training (CLIP) representation flow.",
        type: "svg",
        importance: 10,
        explanation: "This illustrates the visual-textual projection alignment. The image encoder and text encoder map inputs into visual features I1..In and textual features T1..Tn. The dot product similarity scores are optimized over the diagonal.",
        relatedText: "Sections 2.1 and 2.2 detail the contrastive loss function and joint latent projections.",
        svgCode: `
          <svg viewBox="0 0 400 400" class="fig-svg">
            <defs>
              <linearGradient id="clipBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#06b6d4" />
                <stop offset="100%" stop-color="#0891b2" />
              </linearGradient>
              <linearGradient id="clipPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#7c3aed" />
                <stop offset="100%" stop-color="#6d28d9" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" rx="12" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255,255,255,0.05)" />
            
            <!-- Image Encoder -->
            <rect x="20" y="40" width="100" height="60" rx="8" fill="rgba(6,182,212,0.15)" stroke="url(#clipBlue)" stroke-width="2" />
            <text x="70" y="75" fill="white" font-size="11" text-anchor="middle" font-family="monospace">Image Encoder</text>
            
            <!-- Text Encoder -->
            <rect x="280" y="40" width="100" height="60" rx="8" fill="rgba(124,58,237,0.15)" stroke="url(#clipPurple)" stroke-width="2" />
            <text x="330" y="75" fill="white" font-size="11" text-anchor="middle" font-family="monospace">Text Encoder</text>
            
            <!-- Projections flow -->
            <path d="M 70 100 L 120 180" fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="3" />
            <path d="M 330 100 L 280 180" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="3" />
            
            <!-- Shared Representation Matrix box -->
            <rect x="110" y="180" width="180" height="180" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
            <text x="200" y="172" fill="#94a3b8" font-size="10" font-family="Inter" text-anchor="middle">Cosine Similarity Matrix</text>
            
            <!-- Grid lines -->
            <line x1="170" y1="180" x2="170" y2="360" stroke="rgba(255,255,255,0.08)" />
            <line x1="230" y1="180" x2="230" y2="360" stroke="rgba(255,255,255,0.08)" />
            <line x1="110" y1="240" x2="290" y2="240" stroke="rgba(255,255,255,0.08)" />
            <line x1="110" y1="300" x2="290" y2="300" stroke="rgba(255,255,255,0.08)" />
            
            <!-- Active Diagonal matches -->
            <rect x="115" y="185" width="50" height="50" rx="4" fill="rgba(16,185,129,0.3)" stroke="#10b981" />
            <text x="140" y="215" fill="white" font-size="11" text-anchor="middle">I1 - T1</text>
            
            <rect x="175" y="245" width="50" height="50" rx="4" fill="rgba(16,185,129,0.3)" stroke="#10b981" />
            <text x="200" y="275" fill="white" font-size="11" text-anchor="middle">I2 - T2</text>
            
            <rect x="235" y="305" width="50" height="50" rx="4" fill="rgba(16,185,129,0.3)" stroke="#10b981" />
            <text x="260" y="335" fill="white" font-size="11" text-anchor="middle">In - Tn</text>
          </svg>
        `
      }
    ],
    metrics: {
      accuracy: 62.5,
      datasetSize: 400,
      trainingTime: 360,
      parameters: 150.0,
      efficiencyScore: 84
    }
  },
  {
    id: "transformer-2017",
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
    year: 2017,
    doi: "10.48550/arXiv.1706.03762",
    category: "Natural Language Processing",
    tags: ["Attention", "Transformers", "Sequence-to-Sequence", "LLMs"],
    citationCount: 112450,
    readTime: "12 min read",
    status: "Processed",
    fileSize: "2.4 MB",
    abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.",
    
    // Tabbed Summary Contents
    summaries: {
      abstract: "The Transformer is a neural network architecture that relies entirely on self-attention mechanisms to compute representations of its input and output without using sequence-aligned RNNs or convolution. It achieves state-of-the-art results on translation tasks while training significantly faster.",
      detailed: [
        { section: "1. Introduction", content: "Recurrent models (LSTM, GRU) process tokens sequentially, creating a bottleneck that prevents parallel training. The Transformer solves this by processing all tokens simultaneously and using self-attention to establish global dependencies." },
        { section: "2. Background", content: "Self-attention, sometimes called intra-attention, is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence." },
        { section: "3. Model Architecture", content: "The model uses stacked self-attention and point-wise, fully connected layers for both the encoder and decoder. The encoder contains a stack of 6 identical layers, each containing a multi-head self-attention mechanism and a position-wise feed-forward network." }
      ],
      beginner: "Imagine you're reading a book and trying to understand a sentence. Instead of reading each word one by one and forgetting the beginning of the sentence by the time you reach the end, you look at all the words at the same time. You 'pay attention' to how different words connect (like 'he' referring to 'John' ten words earlier). The Transformer does exactly this, allowing computers to read whole pages at once and translate or write text super fast.",
      technical: "The Transformer utilizes Multi-Head Attention, scaling dot-product attention computed as: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V. By projecting queries, keys, and values h times with learned linear projections, it allows the model to jointly attend to information from different representation subspaces at different positions.",
      contributions: [
        "Eliminated recurrence and convolution entirely in sequence-to-sequence models.",
        "Introduced Multi-Head Self-Attention to capture dependencies regardless of distance.",
        "Reduced training times by orders of magnitude through parallelized processing.",
        "Established the foundational architecture for modern LLMs (GPT, BERT, Gemini)."
      ],
      methodology: "The architecture consists of an encoder-decoder structure. The encoder maps an input sequence to a sequence of continuous representations. Given this, the decoder then generates an output sequence of tokens one at a time. Multi-head attention projects Queries, Keys, and Values to project subspaces, calculates dot-product attention, concatenates them, and projects back. Positional encodings are added to inputs to maintain order information.",
      results: "On the WMT 2014 English-to-German translation task, the Transformer model established a new state-of-the-art BLEU score of 28.4, outperforming the best existing models by over 2.0 BLEU. On WMT 2014 English-to-French, it achieved a BLEU score of 41.8, training for only 3.5 days on 8 GPUs.",
      futureWork: "Extending self-attention to inputs/outputs containing modalities other than text (images, audio, video) and scaling the model to handle much longer sequence contexts efficiently.",
      limitations: [
        "Quadratic computational complexity O(N^2) with respect to sequence length N.",
        "Lack of inherent positional bias requires artificial positional encodings.",
        "Decoder inference remains autoregressive (token-by-token), creating a bottleneck during generation."
      ]
    },
    
    // Extracted Figures
    figures: [
      {
        id: "fig-tf-1",
        caption: "Figure 1: The Transformer - model architecture.",
        type: "svg",
        importance: 10,
        explanation: "This diagram shows the complete encoder-decoder stack. The left side is the encoder block which takes positional encodings and runs multi-head self-attention. The right side is the decoder which takes target inputs, performs masked multi-head attention (to prevent looking ahead), and integrates encoder outputs via encoder-decoder attention.",
        relatedText: "Sections 3.1 and 3.2 detail the Encoder and Decoder stacks. Multi-Head Attention blocks are connected with Add & Norm residual steps.",
        svgCode: `
          <svg viewBox="0 0 400 500" class="fig-svg">
            <defs>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2563eb" />
                <stop offset="100%" stop-color="#1d4ed8" />
              </linearGradient>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#7c3aed" />
                <stop offset="100%" stop-color="#6d28d9" />
              </linearGradient>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#06b6d4" />
                <stop offset="100%" stop-color="#0891b2" />
              </linearGradient>
              <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <!-- Background Canvas -->
            <rect width="100%" height="100%" rx="12" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255,255,255,0.05)" />
            
            <!-- ENCODER BOX -->
            <rect x="30" y="80" width="140" height="340" rx="8" fill="rgba(37, 99, 235, 0.1)" stroke="url(#blueGrad)" stroke-width="2" />
            <text x="100" y="110" fill="#e2e8f0" font-weight="bold" font-family="Inter, sans-serif" text-anchor="middle">Encoder (x6)</text>
            
            <!-- Encoder Layers -->
            <rect x="45" y="140" width="110" height="50" rx="6" fill="rgba(124, 58, 237, 0.15)" stroke="#7c3aed" />
            <text x="100" y="170" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Feed Forward</text>
            
            <rect x="45" y="210" width="110" height="50" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" />
            <text x="100" y="240" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Add &amp; Normalize</text>
            
            <rect x="45" y="280" width="110" height="50" rx="6" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" />
            <text x="100" y="310" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Multi-Head Attn</text>

            <rect x="45" y="350" width="110" height="40" rx="6" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.2)" />
            <text x="100" y="375" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Inputs</text>
            
            <!-- DECODER BOX -->
            <rect x="230" y="80" width="140" height="340" rx="8" fill="rgba(124, 58, 237, 0.1)" stroke="url(#purpleGrad)" stroke-width="2" />
            <text x="300" y="110" fill="#e2e8f0" font-weight="bold" font-family="Inter, sans-serif" text-anchor="middle">Decoder (x6)</text>
            
            <!-- Decoder Layers -->
            <rect x="245" y="130" width="110" height="45" rx="6" fill="rgba(124, 58, 237, 0.15)" stroke="#7c3aed" />
            <text x="300" y="158" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Feed Forward</text>
            
            <rect x="245" y="190" width="110" height="45" rx="6" fill="rgba(37, 99, 235, 0.15)" stroke="#2563eb" />
            <text x="300" y="218" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Encoder-Decoder Attn</text>
            
            <rect x="245" y="250" width="110" height="45" rx="6" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" />
            <text x="300" y="278" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Add &amp; Normalize</text>
            
            <rect x="245" y="310" width="110" height="45" rx="6" fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed" opacity="0.9" />
            <text x="300" y="338" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Masked Self-Attn</text>

            <rect x="245" y="370" width="110" height="35" rx="6" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.2)" />
            <text x="300" y="392" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Outputs (shifted)</text>
            
            <!-- Connection Lines -->
            <path d="M 170 305 L 200 305 L 200 212 L 245 212" fill="none" stroke="#00f2fe" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)" />
            <circle cx="170" cy="305" r="4" fill="#00f2fe" />
            <circle cx="245" cy="212" r="4" fill="#00f2fe" />
            
            <text x="200" y="470" fill="#94a3b8" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Global Self-Attention Routing Map</text>
          </svg>
        `
      }
    ],
    
    // Technical comparative specs
    metrics: {
      accuracy: 94.2,      // BLEU Score normalized
      datasetSize: 36,     // GB
      trainingTime: 84,    // Hours
      parameters: 65,      // Millions
      efficiencyScore: 89  // Normalized rating
    }
  },
  {
    id: "lora-2021",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Edward J. Hu, Yibin Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen",
    year: 2021,
    doi: "10.48550/arXiv.2106.09685",
    category: "Model Optimization",
    tags: ["Fine-tuning", "Efficiency", "LLMs", "LoRA"],
    citationCount: 4210,
    readTime: "8 min read",
    status: "Processed",
    fileSize: "1.8 MB",
    abstract: "An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to specific tasks. As models grow, full fine-tuning becomes infeasible. We propose Low-Rank Adaptation (LoRA), which freezes pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing parameters. LoRA reduces the number of trainable parameters by 10,000 times and GPU memory requirements by 3 times.",
    
    summaries: {
      abstract: "LoRA freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, significantly reducing the parameter overhead of fine-tuning large language models.",
      detailed: [
        { section: "1. Introduction", content: "Fine-tuning massive models like GPT-3 (175B) requires updating and storing all weights, which is expensive. LoRA parameterizes the weight updates by factoring them into two low-rank matrices." },
        { section: "2. Low-Rank Matrix Decomposition", content: "For a pre-trained weight matrix W_0 in R^{d x k}, LoRA represents its update delta-W as B * A, where B is in R^{d x r} and A is in R^{r x k}, and the rank r is much smaller than min(d, k)." },
        { section: "3. Benefits", content: "No inference latency is introduced, as matrices can be merged with W_0 during deployment. It allows sharing the base model while serving different tasks with compact task-specific adapter weights." }
      ],
      beginner: "Imagine you have a huge dictionary (like a giant AI model) and you want to adapt it for medical words. Instead of rewriting the entire dictionary, you just insert a tiny, pocket-sized notepad in the back containing only the specialized medical changes. During reading, you look at both the dictionary and your small notebook. It saves tons of ink, paper, and memory, while giving the same medical knowledge.",
      technical: "LoRA parameterizes weight updates delta-W = B * A, where B and A are low-rank matrices. A is initialized from a Gaussian distribution N(0, sigma^2) and B is initialized to 0, ensuring delta-W = 0 at the start of training. A scaling factor alpha / r is applied to scale the adapter outputs.",
      contributions: [
        "Injected trainable rank decomposition matrices into Transformer layers while freezing pre-trained weights.",
        "Reduced trainable parameter footprint by up to 10,000x compared to full fine-tuning.",
        "Zero inference latency: adapters can be folded back into base weights at production time.",
        "Enabled efficient serving of multi-task custom models on shared hardware."
      ],
      methodology: "During adaptation, the pre-trained weight matrix W_0 remains frozen. Trainable matrices A and B are added to query/value projection layers. The output calculation becomes h = W_0 * x + delta-W * x = W_0 * x + (B * A) * x. AdamW is used to train only B and A weights, which are scaled by a constant factor.",
      results: "LoRA matches or outperforms full fine-tuning performance on GLUE and GPT-3 benchmarks while requiring only 0.01% of the trainable parameters. Memory throughput increased by 25% and checkpoints shrank from 350GB to 35MB.",
      futureWork: "Exploring dynamic rank assignment across different attention heads and applying low-rank adaptation concepts to other modalities like Vision Transformers (ViTs).",
      limitations: [
        "Not straightforward to batch inputs requesting different tasks when weight merging is not active.",
        "Reduced representation capacity compared to full fine-tuning on extremely complex, multi-domain out-of-distribution shifts."
      ]
    },
    figures: [
      {
        id: "fig-lora-1",
        caption: "Figure 2: Re-parameterized weight update mapping (LoRA structure).",
        type: "svg",
        importance: 9,
        explanation: "This visualizes the forward pass with LoRA. The input vector x is fed simultaneously to the frozen pre-trained weight W_0 (d x k) and the Low-Rank Adaptation path. The LoRA path first projects x down to a small rank r via matrix A, and then projects it back up to dimension d via matrix B, adding the result to the main output.",
        relatedText: "Section 4.1 describes the mathematical representation and shows the matrix dimensions scaling.",
        svgCode: `
          <svg viewBox="0 0 400 500" class="fig-svg">
            <defs>
              <linearGradient id="purpleCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" rx="12" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255,255,255,0.05)" />
            
            <!-- Input vector -->
            <rect x="150" y="420" width="100" height="30" rx="4" fill="rgba(255,255,255,0.1)" stroke="#e2e8f0" />
            <text x="200" y="440" fill="#f1f5f9" font-size="12" font-family="Inter, sans-serif" text-anchor="middle">Input x (d x 1)</text>
            
            <!-- Left Path: Frozen Weights -->
            <rect x="40" y="200" width="120" height="150" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" stroke-dasharray="3 3" />
            <text x="100" y="260" fill="#fca5a5" font-weight="bold" font-family="Inter, sans-serif" text-anchor="middle">W_0</text>
            <text x="100" y="280" fill="#fca5a5" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">(Frozen)</text>
            <text x="100" y="300" fill="#ef4444" font-size="10" font-family="Inter, sans-serif" text-anchor="middle">Pre-trained (d x k)</text>
            
            <!-- Right Path: LoRA Adapters -->
            <rect x="230" y="160" width="130" height="220" rx="8" fill="rgba(6, 182, 212, 0.1)" stroke="url(#purpleCyan)" stroke-width="2" />
            <text x="295" y="185" fill="#e2e8f0" font-weight="bold" font-family="Inter, sans-serif" text-anchor="middle">LoRA Adapters</text>
            
            <!-- Matrix B -->
            <rect x="250" y="210" width="90" height="50" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" />
            <text x="295" y="235" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Matrix B (d x r)</text>
            <text x="295" y="250" fill="#a78bfa" font-size="9" font-family="Inter, sans-serif" text-anchor="middle">Init to 0</text>

            <!-- Matrix A -->
            <rect x="250" y="300" width="90" height="50" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" />
            <text x="295" y="325" fill="#f1f5f9" font-size="11" font-family="Inter, sans-serif" text-anchor="middle">Matrix A (r x k)</text>
            <text x="295" y="340" fill="#22d3ee" font-size="9" font-family="Inter, sans-serif" text-anchor="middle">Gaussian Init</text>

            <!-- Addition Circle -->
            <circle cx="200" cy="100" r="18" fill="#1e293b" stroke="#e2e8f0" stroke-width="2" />
            <text x="200" y="105" fill="#f1f5f9" font-size="18" font-family="Inter, sans-serif" text-anchor="middle">+</text>
            
            <!-- Outgoing Arrow -->
            <line x1="200" y1="82" x2="200" y2="40" stroke="#f1f5f9" stroke-width="2" />
            <text x="200" y="30" fill="#e2e8f0" font-size="12" font-family="Inter, sans-serif" text-anchor="middle">Output h</text>
            
            <!-- Routing arrows -->
            <path d="M 200 420 L 200 390 L 100 390 L 100 350" fill="none" stroke="#e2e8f0" stroke-width="1.5" />
            <path d="M 200 390 L 295 390 L 295 350" fill="none" stroke="#e2e8f0" stroke-width="1.5" />
            
            <path d="M 100 200 L 100 120 L 182 105" fill="none" stroke="#e2e8f0" stroke-width="1.5" />
            <path d="M 295 210 L 295 120 L 218 105" fill="none" stroke="#e2e8f0" stroke-width="1.5" />
          </svg>
        `
      }
    ],
    metrics: {
      accuracy: 93.8,
      datasetSize: 18,
      trainingTime: 12,
      parameters: 0.28,    // 0.28 Million parameters
      efficiencyScore: 98
    }
  }
];

const SUGGESTED_QUESTIONS = [
  "How does the self-attention mechanism work mathematically?",
  "What is the rank 'r' parameter in LoRA and how does it affect accuracy?",
  "How does the Transformer address the bottleneck of sequential computing in RNNs?",
  "Can I merge the LoRA weights back into the original model weights?",
  "What is the function of the scaling factor (alpha/r) in LoRA?",
  "Why is the self-attention calculation O(N^2) in sequence length?"
];

const MOCK_CHAT_ANSWERS = {
  "How does the self-attention mechanism work mathematically?": {
    response: `The self-attention mechanism calculates relations between words by assigning queries, keys, and values.
For an input sequence matrix \\(X\\), we multiply by projection weights:
- \\(Q = X W_Q\\)
- \\(K = X W_K\\)
- \\(V = X W_V\\)

The dot-product attention score is calculated as:
\\[ \\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V \\]
where \\(\\sqrt{d_k}\\) represents the scaling factor that keeps the gradients stable when \\(d_k\\) is large.`,
    citations: [{ page: 3, snippet: "Section 3.2.1: Scaled Dot-Product Attention represents query vector mapping..." }]
  },
  "What is the rank 'r' parameter in LoRA and how does it affect accuracy?": {
    response: `In **LoRA (Low-Rank Adaptation)**, the parameter \\(r\\) represents the rank of the adaptation matrices.
A higher rank \\(r\\) allows the model to learn more complex updates, but increases parameters and memory overhead.
- When \\(r=1, 2\\) or \\(4\\), it performs remarkably well on standard tasks (captures >90% of delta-W representation capacity).
- For large shifts (e.g. teaching a model a new programming language), a higher \\(r=8, 16\\) or \\(32\\) is sometimes preferred.`,
    citations: [{ page: 5, snippet: "Table 2: Comparison of different rank r choices on GPT-3 adaptation datasets..." }]
  },
  "How does the Transformer address the bottleneck of sequential computing in RNNs?": {
    response: `Traditional RNNs must update their hidden states token-by-token (i.e. \\(h_t = f(h_{t-1}, x_t)\\)), preventing parallelization over the time dimension.
The **Transformer** avoids this by replacing recurrence entirely with self-attention.
All tokens are input together, and the attention mechanism computes correlations between all word tokens in parallel. Positional encodings are appended to preserve token sequence order.`,
    citations: [{ page: 1, snippet: "Section 1: Recurrent models preclude parallelization within training examples..." }]
  },
  "Can I merge the LoRA weights back into the original model weights?": {
    response: `**Yes!** One of the key benefits of LoRA is that the weights can be mathematically folded back into the base weights prior to deployment:
\\[ W_{\\text{final}} = W_0 + B \\times A \\]
This requires a single matrix addition. During inference, you serve \\(W_{\\text{final}}\\) directly, ensuring **zero additional inference latency** and no extra memory overhead compared to the base model.`,
    citations: [{ page: 4, snippet: "Section 4.1: When deploying in production, we can easily merge W = W0 + BA..." }]
  },
  "What is the function of the scaling factor (alpha/r) in LoRA?": {
    response: `The scaling factor \\(\\frac{\\alpha}{r}\\) adjusts the magnitude of the adapter's update vector.
- \\(\\alpha\\) is a constant hyperparameter.
- By scaling the weight updates by \\(\\frac{\\alpha}{r}\\), the model maintains consistent scaling even if you change the rank \\(r\\).
This avoids the need to re-tune hyper-parameters (like learning rate) when experimenting with different rank selections.`,
    citations: [{ page: 4, snippet: "Section 4.1: We scale delta-W * x by alpha/r. This scaling helps adjust learning dynamics..." }]
  },
  "Why is the self-attention calculation O(N^2) in sequence length?": {
    response: `The self-attention calculation scales quadratically because every token in a sequence must compute a dot-product attention score with *every other token* in that sequence.
Given a sequence of length \\(N\\):
- Calculating \\(Q K^T\\) results in an \\(N \\times N\\) attention score matrix.
- Each value in this matrix requires an operations scale of \\(O(d)\\).
For long contexts (e.g. \\(N > 32,000\\)), this matrix lookup requires immense memory and operations, which is the primary drawback of standard Transformers.`,
    citations: [{ page: 7, snippet: "Section 5.2: Self-attention layers require O(n^2 * d) complexity per layer..." }]
  }
};

const KNOWLEDGE_GRAPH_DB = {
  nodes: [
    // Authors
    { id: "Vaswani", label: "A. Vaswani", type: "Author", group: "author", fx: 150, fy: 150 },
    { id: "Hu", label: "E. Hu", type: "Author", group: "author", fx: 250, fy: 320 },
    { id: "Chen", label: "W. Chen", type: "Author", group: "author", fx: 350, fy: 320 },
    
    // Models / Papers
    { id: "Transformer", label: "Transformer", type: "Model", group: "model", fx: 150, fy: 220 },
    { id: "LoRA", label: "LoRA", type: "Model", group: "model", fx: 280, fy: 250 },
    
    // Methods
    { id: "Attention", label: "Self-Attention", type: "Method", group: "method", fx: 80, fy: 250 },
    { id: "MatrixDecomp", label: "Rank Decomposition", type: "Method", group: "method", fx: 360, fy: 200 },
    { id: "FineTuning", label: "PEFT Fine-Tuning", type: "Method", group: "method", fx: 280, fy: 160 },
    
    // Datasets
    { id: "WMT14", label: "WMT 14 Translation", type: "Dataset", group: "dataset", fx: 50, fy: 160 },
    { id: "GLUE", label: "GLUE Benchmark", type: "Dataset", group: "dataset", fx: 350, fy: 100 },
    { id: "WikiText", label: "WikiText-103", type: "Dataset", group: "dataset", fx: 220, fy: 80 }
  ],
  links: [
    { source: "Vaswani", target: "Transformer", label: "authored" },
    { source: "Transformer", target: "Attention", label: "uses" },
    { source: "Transformer", target: "WMT14", label: "evaluated on" },
    
    { source: "Hu", target: "LoRA", label: "authored" },
    { source: "Chen", target: "LoRA", label: "authored" },
    { source: "LoRA", target: "MatrixDecomp", label: "uses" },
    { source: "LoRA", target: "FineTuning", label: "is-a" },
    { source: "LoRA", target: "Transformer", label: "modifies" },
    { source: "LoRA", target: "GLUE", label: "evaluated on" },
    { source: "LoRA", target: "WikiText", label: "evaluated on" },
    
    { source: "FineTuning", target: "Transformer", label: "optimizes" }
  ]
};
