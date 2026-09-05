/**
 * 付属ページ（符号表・解説・About・プライバシー）の本文。
 * アプリ本体の文言は Morse Trainer.dc.html の STR にある。こちらはサイト側の読み物。
 *
 * 足りない項目は英語で埋まる（build.mjs 側で合成）。言語を足すときはここに1ブロック。
 */
export const PAGES = {
  en: {
    langName: "English",
    nav: { tool: "Practice set", chart: "Code chart", learn: "How the tree works", about: "About", privacy: "Privacy" },
    backToTool: "Open the practice set",
    otherLangs: "Other languages",

    chart: {
      title: "Morse Code Chart — full alphabet, numbers and punctuation",
      desc: "The complete Morse code chart: every letter, digit and punctuation mark with its dots and dashes, plus the Japanese Wabun set. Free, no sign-up.",
      h1: "Morse code chart",
      intro: "Every character in international Morse code, with the exact sequence of dots and dashes. A dot is one unit long, a dash is three. Inside a character the gap is one unit; between characters, three; between words, seven.",
      colChar: "Character", colCode: "Code", colDepth: "Elements",
      secLatin: "International Morse code (Latin)",
      secLatinNote: "Letters, digits and punctuation as defined by ITU-R M.1677-1.",
      secWabun: "Wabun code (Japanese kana)",
      secWabunNote: "The Japanese Morse code used for kana. The same dots and dashes map to different characters than in the Latin set.",
      tip: "Reading the chart is the slow way. The fast way is to trace the tree: each dot or dash takes you one step down a branching path, so you never memorise 53 separate patterns."
    },

    learn: {
      title: "How to learn Morse code with a code tree",
      desc: "Why a binary tree beats memorising 53 patterns, how dot and dash split every branch, and how to practise so the codes become sounds instead of counting.",
      h1: "How the code tree works",
      secs: [
        { h: "Morse code is a tree, not a list",
          p: "Most charts present Morse code as 53 unrelated patterns to memorise. It is not. Every code is a path down a binary tree. Start at the root. A dot takes the left branch, a dash the right. After one step you are at E or T. After two, at I, A, N or M. Every character in the language sits somewhere on that tree, and its code is simply the route you took to reach it." },
        { h: "Why this is faster",
          p: "On a tree you learn relationships instead of items. E is one dot. Add a dot and you have I. Add another and you have S. Another and it is H. Four characters, one idea: keep adding dots. The same holds on the other side: T, M, O are one, two and three dashes. Once you see the structure, the chart stops being a wall of symbols and becomes a map you can walk." },
        { h: "Round for dot, square for dash",
          p: "In the practice set the shape of each node tells you the last element that got you there. A round node was reached by a dot, a square node by a dash. Thin connecting lines are dots, thick lines are dashes. You can read any character's code straight off the picture without looking anything up." },
        { h: "Dots and dashes are ratios, not fixed lengths",
          p: "A dash is always three times a dot, and the unit length depends on the sending speed. At 12 words per minute a dot is 100 ms and a dash 300 ms; at 40 WPM a dot is 30 ms and a dash 90 ms. That means a fast dash is shorter than a slow dot. Nobody decodes by measuring milliseconds — you lock onto the sender's rhythm and judge each element against it, exactly as you follow the tempo of a piece of music." },
        { h: "Counting is a stage, not the goal",
          p: "A beginner hears dot-dash-dot and works out the path to R. Above roughly 20 words per minute there is no time for that, and experienced operators stop decoding element by element. Each character arrives as a single sound shape, recognised whole the way you recognise a spoken word. This is why the standard learning methods keep characters at full speed from the start and stretch only the gaps between them — slowing the characters down makes the shapes fall apart and traps you in counting." },
        { h: "How to practise here",
          p: "Set the mode to Drill. A character is named; find it on the tree and send it. Get it wrong and the correct path lights up in green, which is the moment you actually learn it. The set starts at the six shortest codes and widens as you answer correctly, so you are never facing all 53 at once. Your progress is kept in your browser, so you can come back tomorrow and carry on." }
      ]
    },

    about: {
      title: "About the Morse Practice Set",
      desc: "What this free Morse code trainer is, who made it, and how it works.",
      h1: "About",
      body: [
        "The Morse Practice Set is a free browser tool for learning Morse code by tracing a signal tree. There is no account, no install and no paywall.",
        "Most Morse trainers assume you already know the alphabet and drill you on speed. This one is built for the stage before that: you can see the whole code set as one branching diagram while you practise, so you can look up what you do not yet remember.",
        "It covers international Morse code and the Japanese Wabun set, and the interface is available in nine languages. Timing follows ITU-R M.1677-1: a dot of one unit, a dash of three, with the gap before a character is committed deliberately widened so that a beginner has time to search the tree.",
        "The source code is public on GitHub."
      ]
    },

    privacy: {
      title: "Privacy",
      desc: "What this site stores and what it does not.",
      h1: "Privacy",
      body: [
        "This site does not ask for, collect or transmit any personal information. There is no account, no login and no form.",
        "Your chosen interface language and your practice progress are kept in your own browser using local storage. They never leave your device and are not visible to anyone else, including us. Clearing your browser data removes them.",
        "The site loads web fonts from Google Fonts. Requests to that service reveal your IP address to Google under their own privacy policy. Everything else is served from this domain.",
        "If advertising is added in future, this page will be updated before it goes live to state exactly what the advertising partner collects and how to control it."
      ]
    }
  },

  ja: {
    langName: "日本語",
    nav: { tool: "練習器", chart: "符号表", learn: "符号樹のしくみ", about: "このサイトについて", privacy: "プライバシー" },
    backToTool: "練習器を開く",
    otherLangs: "他の言語",

    chart: {
      title: "モールス符号表 ─ 欧文・数字・記号・和文の一覧",
      desc: "モールス符号の全一覧。アルファベット・数字・記号に加え、和文（カナ）も収録。短点と長点の並びをそのまま掲載。登録不要・無料。",
      h1: "モールス符号表",
      intro: "国際モールス符号の全文字と、その短点・長点の並び。短点は1単位、長点は3単位の長さ。文字の中の間は1単位、文字と文字の間は3単位、語と語の間は7単位。",
      colChar: "文字", colCode: "符号", colDepth: "要素数",
      secLatin: "国際モールス符号（欧文）",
      secLatinNote: "ITU-R M.1677-1 が定めるアルファベット・数字・記号。",
      secWabun: "和文モールス符号（カナ）",
      secWabunNote: "日本語のカナに用いるモールス符号。同じ短点・長点の並びでも、欧文とは別の文字に対応する。",
      tip: "表を暗記するのは遅い道。速いのは符号樹をたどること。短点か長点を1つ打つたびに枝を1段下るので、53個の並びを別々に覚える必要がなくなる。"
    },

    learn: {
      title: "符号樹でモールス符号を覚える方法",
      desc: "53個の暗記より二分木が速い理由、短点と長点がどう枝を分けるか、数えるのをやめて音の形として聞けるようになるまでの練習法。",
      h1: "符号樹のしくみ",
      secs: [
        { h: "モールス符号は一覧表ではなく木である",
          p: "多くの符号表は、53個の無関係な並びとして提示する。だが実際は違う。すべての符号は二分木をたどった経路そのものだ。根から始めて、短点なら左、長点なら右へ。1段下れば E か T。2段で I・A・N・M。すべての文字は木のどこかにあり、その符号とは、そこへ至るまでの道順にほかならない。" },
        { h: "なぜ速いのか",
          p: "木の上では、項目ではなく関係を覚えることになる。E は短点1つ。もう1つ足せば I。さらに足せば S。もう1つで H。4文字が「短点を足していくだけ」という1つの考えに収まる。反対側も同じで、T・M・O は長点が1つ・2つ・3つ。構造が見えた瞬間、符号表は記号の壁ではなく、歩ける地図に変わる。" },
        { h: "丸が短点、角が長点",
          p: "この練習器では、節点の形がそこへ至った最後の符号を示す。丸い節点は短点で、角い節点は長点でたどり着いたもの。枝の線も、細ければ短点、太ければ長点。どの文字の符号も、図を見るだけで読み取れる。" },
        { h: "短点と長点は「比」であって、決まった長さではない",
          p: "長点は常に短点の3倍で、その1単位の長さは送信速度で変わる。12 WPM なら短点100ミリ秒・長点300ミリ秒。40 WPM なら短点30ミリ秒・長点90ミリ秒。つまり速い送信の長点は、遅い送信の短点より短い。誰もミリ秒を測って解読してはいない。相手のテンポに乗り、その中での相対比で判断している。音楽の拍を追うのと同じことだ。" },
        { h: "数えるのは通過点であって、目的地ではない",
          p: "初心者は「短・長・短」と聞いて経路をたどり R にたどり着く。だが毎分20語を超えるとその余裕はなくなり、熟練者は要素ごとの解読をやめる。1文字が1つの音の形としてまるごと届き、話し言葉を聞き取るように認識される。学習法が「文字そのものは最初から速く、文字と文字の間だけを広げる」となっているのはこのためだ。文字を遅くすると音の形が崩れ、数えるモードから抜け出せなくなる。" },
        { h: "ここでの練習のしかた",
          p: "モードを「出題」にする。文字が示されるので、符号樹の上で探して打つ。間違えると正解の経路が緑に光る。実はそこが一番覚える瞬間だ。対象は短い符号6字から始まり、正解するにつれて広がるので、最初から53字を相手にすることはない。進捗はブラウザに残るので、明日また続きから始められる。" }
      ]
    },

    about: {
      title: "このサイトについて",
      desc: "無料のモールス符号練習器について。何ができて、どう作られているか。",
      h1: "このサイトについて",
      body: [
        "符号樹をたどってモールス符号を覚えるための、無料のブラウザ道具です。登録も、導入作業も、有料版もありません。",
        "多くのモールス練習ソフトは「符号はもう覚えた」ことを前提に速度を鍛えます。これはその手前の段階のために作りました。練習しながら符号の全体像を1枚の図として見ていられるので、まだ覚えていないものはその場で調べられます。",
        "欧文と和文の両方に対応し、画面は9言語で表示できます。時間の比率は ITU-R M.1677-1 に従い、短点1・長点3。ただし文字が確定するまでの間だけは、符号を探しながら打つ人のために意図的に広げてあります。",
        "ソースコードは GitHub で公開しています。"
      ]
    },

    privacy: {
      title: "プライバシー",
      desc: "このサイトが保存するもの、しないもの。",
      h1: "プライバシー",
      body: [
        "このサイトは個人情報を一切求めず、収集せず、送信しません。アカウントもログインも入力欄もありません。",
        "選んだ表示言語と練習の進捗は、お使いのブラウザのローカルストレージに保存されます。端末の外に出ることはなく、運営者を含め他の誰からも見えません。ブラウザのデータを消せば一緒に消えます。",
        "書体を Google Fonts から読み込んでいます。その通信により、Google 社のプライバシーポリシーのもとで IP アドレスが同社に伝わります。それ以外はすべてこのドメインから配信しています。",
        "今後、広告を掲載する場合は、掲載を始める前にこのページを更新し、広告の提供者が何を取得するか、どう制御できるかを明記します。"
      ]
    }
  },

  es: {
    langName: "Español",
    nav: {
      tool: "Equipo de práctica",
      chart: "Tabla de código",
      learn: "Cómo funciona el árbol",
      about: "Acerca de",
      privacy: "Privacidad"
    },
    backToTool: "Abrir el equipo de práctica",
    otherLangs: "Otros idiomas",
    chart: {
      title: "Tabla de código Morse — alfabeto, números y puntuación completos",
      desc: "La tabla completa del código Morse: cada letra, cifra y signo con sus puntos y rayas, más el conjunto japonés Wabun. Gratis, sin registro.",
      h1: "Tabla de código Morse",
      intro: "Todos los caracteres del código Morse internacional, con la secuencia exacta de puntos y rayas. Un punto dura una unidad; una raya, tres. Dentro de un carácter el hueco es de una unidad; entre caracteres, de tres; entre palabras, de siete.",
      colChar: "Carácter",
      colCode: "Código",
      colDepth: "Elementos",
      secLatin: "Código Morse internacional (latino)",
      secLatinNote: "Letras, cifras y signos según la norma ITU-R M.1677-1.",
      secWabun: "Código Wabun (kana japonés)",
      secWabunNote: "El código Morse japonés para los kana. Las mismas combinaciones de puntos y rayas corresponden a caracteres distintos que en el conjunto latino.",
      tip: "Leer la tabla es el camino lento. El rápido es recorrer el árbol: cada punto o raya te hace bajar un paso por una ramificación, así que nunca memorizas 53 patrones sueltos."
    },
    learn: {
      title: "Cómo aprender código Morse con un árbol de códigos",
      desc: "Por qué un árbol binario supera a memorizar 53 patrones, cómo el punto y la raya dividen cada rama, y cómo practicar hasta que los códigos sean sonidos y no cuentas.",
      h1: "Cómo funciona el árbol de códigos",
      secs: [
        {
          h: "El código Morse es un árbol, no una lista",
          p: "Casi todas las tablas presentan el Morse como 53 patrones inconexos que hay que memorizar. No lo es. Cada código es un recorrido por un árbol binario. Empieza en la raíz: un punto toma la rama izquierda, una raya la derecha. Tras un paso estás en E o T. Tras dos, en I, A, N o M. Cada carácter ocupa un lugar en ese árbol, y su código no es más que la ruta que seguiste para llegar."
        },
        {
          h: "Por qué es más rápido",
          p: "En un árbol aprendes relaciones en vez de elementos. E es un punto. Añade otro y tienes I. Otro más y es S. Uno más y es H. Cuatro caracteres, una sola idea: seguir añadiendo puntos. Lo mismo del otro lado: T, M y O son una, dos y tres rayas. Cuando ves la estructura, la tabla deja de ser un muro de símbolos y se convierte en un mapa que puedes recorrer."
        },
        {
          h: "Redondo para el punto, cuadrado para la raya",
          p: "En el equipo de práctica, la forma de cada nodo indica el último elemento que te llevó hasta él. Un nodo redondo se alcanzó con un punto; uno cuadrado, con una raya. Las líneas finas son puntos y las gruesas, rayas. Puedes leer el código de cualquier carácter directamente del dibujo."
        },
        {
          h: "Puntos y rayas son proporciones, no duraciones fijas",
          p: "Una raya siempre dura el triple que un punto, y la unidad depende de la velocidad de transmisión. A 12 palabras por minuto un punto son 100 ms y una raya 300 ms; a 40 PPM, 30 y 90 ms. Es decir, una raya rápida es más corta que un punto lento. Nadie descifra midiendo milisegundos: te enganchas al ritmo de quien transmite y juzgas cada elemento con respecto a él, igual que sigues el compás de una pieza musical."
        },
        {
          h: "Contar es una etapa, no la meta",
          p: "Un principiante oye punto-raya-punto y deduce el camino hasta la R. Por encima de unas 20 palabras por minuto no da tiempo, y los operadores expertos dejan de descifrar elemento a elemento. Cada carácter llega como una única forma sonora que se reconoce entera, como se reconoce una palabra hablada. Por eso los métodos clásicos mantienen los caracteres a velocidad plena desde el principio y solo alargan los huecos entre ellos: frenar los caracteres deshace la forma y te deja atrapado contando."
        },
        {
          h: "Cómo practicar aquí",
          p: "Pon el modo en Ejercicio. Se te indica un carácter; búscalo en el árbol y transmítelo. Si fallas, el camino correcto se ilumina en verde, que es justo el momento en que de verdad se aprende. El conjunto empieza con los seis códigos más cortos y se amplía a medida que aciertas, así que nunca te enfrentas a los 53 de golpe. Tu progreso queda guardado en el navegador para continuar mañana."
        }
      ]
    },
    about: {
      title: "Acerca del Equipo de práctica Morse",
      desc: "Qué es este entrenador gratuito de código Morse y cómo funciona.",
      h1: "Acerca de",
      body: [
        "El Equipo de práctica Morse es una herramienta web gratuita para aprender código Morse recorriendo un árbol de señales. Sin cuenta, sin instalación y sin muro de pago.",
        "La mayoría de los entrenadores dan por hecho que ya conoces el alfabeto y te ejercitan en velocidad. Este está pensado para la etapa anterior: puedes ver todo el conjunto como un solo diagrama mientras practicas, y consultar lo que aún no recuerdas.",
        "Cubre el código Morse internacional y el conjunto japonés Wabun, con interfaz en nueve idiomas. Los tiempos siguen la norma ITU-R M.1677-1: un punto de una unidad y una raya de tres, con el hueco previo a fijar un carácter deliberadamente ampliado para dar tiempo a buscar en el árbol.",
        "El código fuente es público en GitHub."
      ]
    },
    privacy: {
      title: "Privacidad",
      desc: "Qué guarda este sitio y qué no.",
      h1: "Privacidad",
      body: [
        "Este sitio no pide, ni recoge, ni transmite ningún dato personal. No hay cuenta, ni inicio de sesión, ni formularios.",
        "El idioma elegido y tu progreso se guardan en tu propio navegador mediante almacenamiento local. Nunca salen de tu dispositivo y nadie más puede verlos, tampoco nosotros. Si borras los datos del navegador, desaparecen.",
        "El sitio carga tipografías desde Google Fonts. Esas peticiones revelan tu dirección IP a Google conforme a su propia política de privacidad. Todo lo demás se sirve desde este dominio.",
        "Si en el futuro se añade publicidad, esta página se actualizará antes de activarla para indicar exactamente qué recoge el proveedor y cómo controlarlo."
      ]
    }
  },

  fr: {
    langName: "Français",
    nav: {
      tool: "Poste d’entraînement",
      chart: "Table du code",
      learn: "Le fonctionnement de l’arbre",
      about: "À propos",
      privacy: "Confidentialité"
    },
    backToTool: "Ouvrir le poste d’entraînement",
    otherLangs: "Autres langues",
    chart: {
      title: "Table du code Morse — alphabet, chiffres et ponctuation complets",
      desc: "La table complète du code Morse : chaque lettre, chiffre et signe avec ses points et traits, ainsi que le jeu japonais wabun. Gratuit, sans inscription.",
      h1: "Table du code Morse",
      intro: "Tous les caractères du code Morse international, avec la suite exacte de points et de traits. Un point dure une unité, un trait trois. À l’intérieur d’un caractère l’intervalle vaut une unité, entre caractères trois, entre mots sept.",
      colChar: "Caractère",
      colCode: "Code",
      colDepth: "Éléments",
      secLatin: "Code Morse international (latin)",
      secLatinNote: "Lettres, chiffres et ponctuation selon la recommandation UIT-R M.1677-1.",
      secWabun: "Code wabun (kana japonais)",
      secWabunNote: "Le code Morse japonais pour les kana. Les mêmes suites de points et de traits désignent d’autres caractères que dans le jeu latin.",
      tip: "Lire la table est la voie lente. La voie rapide consiste à parcourir l’arbre : chaque point ou trait fait descendre d’un cran dans une ramification, si bien qu’on ne mémorise jamais 53 motifs séparés."
    },
    learn: {
      title: "Apprendre le code Morse avec un arbre des codes",
      desc: "Pourquoi un arbre binaire vaut mieux que mémoriser 53 motifs, comment point et trait séparent chaque branche, et comment s’entraîner jusqu’à entendre des formes sonores plutôt que compter.",
      h1: "Le fonctionnement de l’arbre des codes",
      secs: [
        {
          h: "Le code Morse est un arbre, pas une liste",
          p: "La plupart des tables présentent le Morse comme 53 motifs sans lien à apprendre par cœur. C’est faux. Chaque code est un chemin dans un arbre binaire. Partez de la racine : un point prend la branche de gauche, un trait celle de droite. Après un pas vous êtes sur E ou T. Après deux, sur I, A, N ou M. Chaque caractère occupe une place dans cet arbre, et son code n’est que l’itinéraire suivi pour l’atteindre."
        },
        {
          h: "Pourquoi c’est plus rapide",
          p: "Sur un arbre, on apprend des relations plutôt que des éléments. E, c’est un point. Ajoutez-en un : I. Encore un : S. Encore un : H. Quatre caractères, une seule idée : continuer d’ajouter des points. De l’autre côté, T, M et O sont un, deux et trois traits. Dès que la structure apparaît, la table cesse d’être un mur de symboles et devient une carte que l’on parcourt."
        },
        {
          h: "Rond pour le point, carré pour le trait",
          p: "Dans le poste d’entraînement, la forme de chaque nœud indique le dernier élément qui y a mené. Un nœud rond a été atteint par un point, un nœud carré par un trait. Les traits fins sont des points, les traits épais des traits. On lit le code de n’importe quel caractère directement sur le dessin."
        },
        {
          h: "Points et traits sont des rapports, pas des durées fixes",
          p: "Un trait vaut toujours trois points, et la durée de l’unité dépend de la vitesse d’émission. À 12 mots par minute, un point fait 100 ms et un trait 300 ms ; à 40 mots par minute, 30 et 90 ms. Autrement dit, un trait rapide est plus court qu’un point lent. Personne ne décode en mesurant des millisecondes : on se cale sur le rythme de l’émetteur et l’on juge chaque élément par rapport à lui, comme on suit le tempo d’un morceau de musique."
        },
        {
          h: "Compter est une étape, pas le but",
          p: "Le débutant entend point-trait-point et reconstitue le chemin jusqu’au R. Au-delà d’environ 20 mots par minute, le temps manque, et les opérateurs expérimentés cessent de décoder élément par élément. Chaque caractère arrive comme une forme sonore unique, reconnue d’un bloc comme on reconnaît un mot parlé. C’est pourquoi les méthodes classiques gardent les caractères à pleine vitesse dès le départ et n’allongent que les intervalles : ralentir les caractères casse la forme et enferme dans le comptage."
        },
        {
          h: "Comment s’entraîner ici",
          p: "Passez en mode Exercice. Un caractère est annoncé ; trouvez-le sur l’arbre et transmettez-le. En cas d’erreur, le chemin correct s’allume en vert — c’est précisément le moment où l’on apprend. La série commence par les six codes les plus courts et s’élargit au fil des réussites, on n’affronte donc jamais les 53 d’un coup. Votre progression est conservée dans le navigateur pour reprendre demain."
        }
      ]
    },
    about: {
      title: "À propos du poste d’entraînement Morse",
      desc: "Ce qu’est cet entraîneur de code Morse gratuit et comment il fonctionne.",
      h1: "À propos",
      body: [
        "Le poste d’entraînement Morse est un outil web gratuit pour apprendre le code Morse en parcourant un arbre des signaux. Sans compte, sans installation, sans version payante.",
        "La plupart des entraîneurs supposent que vous connaissez déjà l’alphabet et travaillent la vitesse. Celui-ci vise l’étape précédente : vous gardez sous les yeux l’ensemble du code sous forme d’un seul schéma pendant que vous vous entraînez, et vous pouvez y chercher ce dont vous ne vous souvenez pas encore.",
        "Il couvre le code Morse international et le jeu japonais wabun, avec une interface en neuf langues. Les durées suivent la recommandation UIT-R M.1677-1 : un point d’une unité, un trait de trois, l’intervalle avant la validation d’un caractère étant volontairement élargi pour laisser le temps de chercher dans l’arbre.",
        "Le code source est public sur GitHub."
      ]
    },
    privacy: {
      title: "Confidentialité",
      desc: "Ce que ce site conserve et ce qu’il ne conserve pas.",
      h1: "Confidentialité",
      body: [
        "Ce site ne demande, ne collecte et ne transmet aucune donnée personnelle. Il n’y a ni compte, ni connexion, ni formulaire.",
        "La langue choisie et votre progression sont conservées dans votre propre navigateur via le stockage local. Elles ne quittent jamais votre appareil et ne sont visibles par personne d’autre, nous compris. Effacer les données du navigateur les supprime.",
        "Le site charge des polices depuis Google Fonts. Ces requêtes communiquent votre adresse IP à Google, selon sa propre politique de confidentialité. Tout le reste est servi depuis ce domaine.",
        "Si de la publicité est ajoutée à l’avenir, cette page sera mise à jour avant sa mise en ligne pour préciser exactement ce que le partenaire publicitaire collecte et comment le contrôler."
      ]
    }
  },

  de: {
    langName: "Deutsch",
    nav: {
      tool: "Übungsgerät",
      chart: "Codetabelle",
      learn: "So funktioniert der Baum",
      about: "Über diese Seite",
      privacy: "Datenschutz"
    },
    backToTool: "Übungsgerät öffnen",
    otherLangs: "Weitere Sprachen",
    chart: {
      title: "Morsecode-Tabelle — Alphabet, Ziffern und Satzzeichen vollständig",
      desc: "Die vollständige Morsecode-Tabelle: jeder Buchstabe, jede Ziffer und jedes Satzzeichen mit Punkten und Strichen, dazu der japanische Wabun-Satz. Kostenlos, ohne Anmeldung.",
      h1: "Morsecode-Tabelle",
      intro: "Alle Zeichen des internationalen Morsecodes mit der genauen Folge aus Punkten und Strichen. Ein Punkt dauert eine Einheit, ein Strich drei. Innerhalb eines Zeichens beträgt die Pause eine Einheit, zwischen Zeichen drei, zwischen Wörtern sieben.",
      colChar: "Zeichen",
      colCode: "Code",
      colDepth: "Elemente",
      secLatin: "Internationaler Morsecode (lateinisch)",
      secLatinNote: "Buchstaben, Ziffern und Satzzeichen nach ITU-R M.1677-1.",
      secWabun: "Wabun-Code (japanische Kana)",
      secWabunNote: "Der japanische Morsecode für Kana. Dieselben Punkt-Strich-Folgen stehen hier für andere Zeichen als im lateinischen Satz.",
      tip: "Die Tabelle zu lesen ist der langsame Weg. Der schnelle ist, dem Baum zu folgen: Jeder Punkt und jeder Strich führt einen Schritt tiefer in eine Verzweigung, sodass man nie 53 einzelne Muster auswendig lernt."
    },
    learn: {
      title: "Morsecode mit einem Codebaum lernen",
      desc: "Warum ein Binärbaum besser ist als 53 Muster auswendig zu lernen, wie Punkt und Strich jeden Ast teilen, und wie man übt, bis aus Zählen Klanggestalten werden.",
      h1: "So funktioniert der Codebaum",
      secs: [
        {
          h: "Morsecode ist ein Baum, keine Liste",
          p: "Die meisten Tabellen zeigen Morsecode als 53 zusammenhanglose Muster zum Auswendiglernen. Das stimmt nicht. Jeder Code ist ein Weg durch einen Binärbaum. Man beginnt an der Wurzel: Ein Punkt führt nach links, ein Strich nach rechts. Nach einem Schritt steht man bei E oder T, nach zweien bei I, A, N oder M. Jedes Zeichen hat seinen Platz in diesem Baum, und sein Code ist schlicht der Weg dorthin."
        },
        {
          h: "Warum das schneller geht",
          p: "Im Baum lernt man Beziehungen statt Einzelstücke. E ist ein Punkt. Einen dazu, und es ist I. Noch einen: S. Noch einen: H. Vier Zeichen, ein Gedanke: weiter Punkte anhängen. Auf der anderen Seite dasselbe: T, M und O sind ein, zwei und drei Striche. Sobald die Struktur sichtbar wird, ist die Tabelle keine Wand aus Symbolen mehr, sondern eine begehbare Karte."
        },
        {
          h: "Rund für Punkt, eckig für Strich",
          p: "Im Übungsgerät zeigt die Form jedes Knotens, welches Element zuletzt dorthin geführt hat. Ein runder Knoten wurde über einen Punkt erreicht, ein eckiger über einen Strich. Dünne Linien sind Punkte, dicke Striche. Den Code jedes Zeichens liest man direkt aus dem Bild ab."
        },
        {
          h: "Punkt und Strich sind Verhältnisse, keine festen Längen",
          p: "Ein Strich dauert immer dreimal so lang wie ein Punkt, und die Einheit hängt vom Tempo ab. Bei 12 Wörtern pro Minute sind das 100 ms und 300 ms, bei 40 WpM 30 ms und 90 ms. Ein schneller Strich ist also kürzer als ein langsamer Punkt. Niemand entschlüsselt durch Messen von Millisekunden: Man klinkt sich in den Rhythmus des Gebenden ein und beurteilt jedes Element daran — genau wie man dem Takt eines Musikstücks folgt."
        },
        {
          h: "Zählen ist eine Stufe, nicht das Ziel",
          p: "Ein Anfänger hört Punkt-Strich-Punkt und rechnet sich den Weg zum R zusammen. Oberhalb von etwa 20 Wörtern pro Minute bleibt dafür keine Zeit, und geübte Funker hören auf, Element für Element zu entschlüsseln. Jedes Zeichen kommt als eine einzige Klanggestalt an, im Ganzen erkannt wie ein gesprochenes Wort. Deshalb halten die bewährten Lernmethoden die Zeichen von Anfang an auf voller Geschwindigkeit und dehnen nur die Pausen dazwischen: Verlangsamt man die Zeichen, zerfällt die Gestalt und man bleibt im Zählen stecken."
        },
        {
          h: "So übt man hier",
          p: "Stellen Sie den Modus auf Übung. Ein Zeichen wird genannt; suchen Sie es im Baum und geben Sie es. Bei einem Fehler leuchtet der richtige Weg grün auf — genau dann lernt man wirklich. Der Umfang beginnt bei den sechs kürzesten Codes und wächst mit jeder richtigen Antwort, man steht also nie vor allen 53 auf einmal. Der Fortschritt bleibt im Browser gespeichert, sodass man morgen weitermachen kann."
        }
      ]
    },
    about: {
      title: "Über das Morse-Übungsgerät",
      desc: "Was dieses kostenlose Morse-Trainingsgerät ist und wie es arbeitet.",
      h1: "Über diese Seite",
      body: [
        "Das Morse-Übungsgerät ist ein kostenloses Browser-Werkzeug, um Morsecode entlang eines Signalbaums zu lernen. Ohne Konto, ohne Installation, ohne Bezahlschranke.",
        "Die meisten Trainer setzen voraus, dass man das Alphabet bereits kennt, und üben Tempo. Dieses ist für die Stufe davor gedacht: Der gesamte Zeichensatz bleibt während des Übens als ein einziges Diagramm sichtbar, sodass man nachschlagen kann, was noch nicht sitzt.",
        "Es umfasst den internationalen Morsecode und den japanischen Wabun-Satz; die Oberfläche gibt es in neun Sprachen. Die Zeiten folgen ITU-R M.1677-1: ein Punkt von einer Einheit, ein Strich von dreien — die Pause vor der Übernahme eines Zeichens ist bewusst verlängert, damit Anfänger Zeit haben, im Baum zu suchen.",
        "Der Quelltext ist öffentlich auf GitHub."
      ]
    },
    privacy: {
      title: "Datenschutz",
      desc: "Was diese Seite speichert und was nicht.",
      h1: "Datenschutz",
      body: [
        "Diese Seite fragt keine personenbezogenen Daten ab, erhebt keine und übermittelt keine. Es gibt kein Konto, keine Anmeldung und kein Formular.",
        "Die gewählte Sprache und Ihr Übungsfortschritt werden im lokalen Speicher Ihres eigenen Browsers abgelegt. Sie verlassen Ihr Gerät nie und sind für niemanden sonst sichtbar, auch nicht für uns. Beim Löschen der Browserdaten verschwinden sie.",
        "Die Seite lädt Schriften von Google Fonts. Diese Anfragen übermitteln Ihre IP-Adresse gemäß der Datenschutzerklärung von Google an Google. Alles Übrige wird von dieser Domain ausgeliefert.",
        "Falls künftig Werbung hinzukommt, wird diese Seite vor deren Aktivierung aktualisiert und benennt genau, was der Werbepartner erhebt und wie sich das steuern lässt."
      ]
    }
  },

  pt: {
    langName: "Português",
    nav: {
      tool: "Aparelho de prática",
      chart: "Tabela do código",
      learn: "Como funciona a árvore",
      about: "Sobre",
      privacy: "Privacidade"
    },
    backToTool: "Abrir o aparelho de prática",
    otherLangs: "Outros idiomas",
    chart: {
      title: "Tabela de código Morse — alfabeto, números e pontuação completos",
      desc: "A tabela completa do código Morse: cada letra, algarismo e sinal com seus pontos e traços, além do conjunto japonês Wabun. Grátis, sem cadastro.",
      h1: "Tabela de código Morse",
      intro: "Todos os caracteres do código Morse internacional, com a sequência exata de pontos e traços. Um ponto dura uma unidade; um traço, três. Dentro de um caractere o intervalo é de uma unidade; entre caracteres, três; entre palavras, sete.",
      colChar: "Caractere",
      colCode: "Código",
      colDepth: "Elementos",
      secLatin: "Código Morse internacional (latino)",
      secLatinNote: "Letras, algarismos e pontuação conforme a ITU-R M.1677-1.",
      secWabun: "Código Wabun (kana japonês)",
      secWabunNote: "O código Morse japonês para os kana. As mesmas sequências de pontos e traços correspondem a caracteres diferentes dos do conjunto latino.",
      tip: "Ler a tabela é o caminho lento. O rápido é percorrer a árvore: cada ponto ou traço desce um passo numa ramificação, de modo que você nunca memoriza 53 padrões avulsos."
    },
    learn: {
      title: "Como aprender código Morse com uma árvore de códigos",
      desc: "Por que uma árvore binária supera decorar 53 padrões, como ponto e traço dividem cada ramo, e como praticar até que os códigos virem sons em vez de contagem.",
      h1: "Como funciona a árvore de códigos",
      secs: [
        {
          h: "O código Morse é uma árvore, não uma lista",
          p: "A maioria das tabelas apresenta o Morse como 53 padrões sem relação a serem decorados. Não é assim. Cada código é um caminho por uma árvore binária. Comece na raiz: um ponto toma o ramo da esquerda, um traço o da direita. Após um passo você está em E ou T. Após dois, em I, A, N ou M. Cada caractere ocupa um lugar nessa árvore, e seu código é apenas a rota percorrida até ele."
        },
        {
          h: "Por que isso é mais rápido",
          p: "Numa árvore você aprende relações em vez de itens. E é um ponto. Acrescente outro e tem I. Mais um e é S. Mais um e é H. Quatro caracteres, uma única ideia: continuar acrescentando pontos. Do outro lado vale o mesmo: T, M e O são um, dois e três traços. Quando a estrutura aparece, a tabela deixa de ser um muro de símbolos e vira um mapa que se percorre."
        },
        {
          h: "Redondo para ponto, quadrado para traço",
          p: "No aparelho de prática, a forma de cada nó indica o último elemento que levou até ele. Um nó redondo foi alcançado por um ponto; um quadrado, por um traço. Linhas finas são pontos e linhas grossas, traços. Dá para ler o código de qualquer caractere direto do desenho."
        },
        {
          h: "Pontos e traços são proporções, não durações fixas",
          p: "Um traço dura sempre o triplo de um ponto, e a unidade depende da velocidade de transmissão. A 12 palavras por minuto, um ponto tem 100 ms e um traço 300 ms; a 40 PPM, 30 e 90 ms. Ou seja, um traço rápido é mais curto que um ponto lento. Ninguém decodifica medindo milissegundos: você entra no ritmo de quem transmite e julga cada elemento em relação a ele, como quem acompanha o compasso de uma música."
        },
        {
          h: "Contar é uma etapa, não o objetivo",
          p: "O iniciante ouve ponto-traço-ponto e reconstrói o caminho até o R. Acima de cerca de 20 palavras por minuto não há tempo, e operadores experientes deixam de decodificar elemento a elemento. Cada caractere chega como uma única forma sonora, reconhecida inteira como se reconhece uma palavra falada. Por isso os métodos consagrados mantêm os caracteres em velocidade plena desde o início e alongam apenas os intervalos: desacelerar os caracteres desfaz a forma e prende você na contagem."
        },
        {
          h: "Como praticar aqui",
          p: "Ponha o modo em Exercício. Um caractere é indicado; ache-o na árvore e transmita. Se errar, o caminho correto acende em verde — é exatamente aí que se aprende. O conjunto começa com os seis códigos mais curtos e se amplia conforme você acerta, então nunca enfrenta os 53 de uma vez. Seu progresso fica guardado no navegador para continuar amanhã."
        }
      ]
    },
    about: {
      title: "Sobre o Aparelho de prática de Morse",
      desc: "O que é este treinador gratuito de código Morse e como ele funciona.",
      h1: "Sobre",
      body: [
        "O Aparelho de prática de Morse é uma ferramenta web gratuita para aprender código Morse percorrendo uma árvore de sinais. Sem conta, sem instalação e sem versão paga.",
        "A maioria dos treinadores pressupõe que você já conhece o alfabeto e trabalha velocidade. Este foi feito para a etapa anterior: você vê todo o conjunto como um único diagrama enquanto pratica, podendo consultar o que ainda não lembra.",
        "Cobre o código Morse internacional e o conjunto japonês Wabun, com interface em nove idiomas. Os tempos seguem a ITU-R M.1677-1: ponto de uma unidade e traço de três, com o intervalo antes de fixar um caractere deliberadamente ampliado para dar tempo de procurar na árvore.",
        "O código-fonte é público no GitHub."
      ]
    },
    privacy: {
      title: "Privacidade",
      desc: "O que este site guarda e o que não guarda.",
      h1: "Privacidade",
      body: [
        "Este site não pede, não coleta e não transmite nenhum dado pessoal. Não há conta, login nem formulário.",
        "O idioma escolhido e o seu progresso ficam no seu próprio navegador, no armazenamento local. Nunca saem do seu dispositivo e ninguém mais os vê, nem nós. Limpar os dados do navegador os remove.",
        "O site carrega fontes do Google Fonts. Essas requisições revelam o seu endereço IP ao Google, conforme a política de privacidade da empresa. Todo o resto é servido a partir deste domínio.",
        "Se houver publicidade no futuro, esta página será atualizada antes de entrar no ar, informando exatamente o que o parceiro de publicidade coleta e como controlar isso."
      ]
    }
  },

  ru: {
    langName: "Русский",
    nav: {
      tool: "Тренажёр",
      chart: "Таблица кода",
      learn: "Как устроено дерево",
      about: "О сайте",
      privacy: "Конфиденциальность"
    },
    backToTool: "Открыть тренажёр",
    otherLangs: "Другие языки",
    chart: {
      title: "Таблица азбуки Морзе — буквы, цифры и знаки полностью",
      desc: "Полная таблица азбуки Морзе: каждая буква, цифра и знак с точками и тире, а также японский набор вабун. Бесплатно, без регистрации.",
      h1: "Таблица азбуки Морзе",
      intro: "Все знаки международной азбуки Морзе с точной последовательностью точек и тире. Точка длится одну единицу, тире — три. Внутри знака пауза равна одной единице, между знаками — трём, между словами — семи.",
      colChar: "Знак",
      colCode: "Код",
      colDepth: "Элементов",
      secLatin: "Международная азбука Морзе (латиница)",
      secLatinNote: "Буквы, цифры и знаки препинания согласно ITU-R M.1677-1.",
      secWabun: "Код вабун (японская кана)",
      secWabunNote: "Японская азбука Морзе для каны. Те же сочетания точек и тире означают здесь другие знаки, чем в латинском наборе.",
      tip: "Читать таблицу — медленный путь. Быстрый — идти по дереву: каждая точка или тире опускает на шаг вниз по развилке, и заучивать 53 отдельных сочетания не приходится."
    },
    learn: {
      title: "Как учить азбуку Морзе по дереву кодов",
      desc: "Почему двоичное дерево лучше зубрёжки 53 сочетаний, как точка и тире делят каждую ветвь и как заниматься, чтобы коды стали звуковыми образами, а не счётом.",
      h1: "Как устроено дерево кодов",
      secs: [
        {
          h: "Азбука Морзе — это дерево, а не список",
          p: "Большинство таблиц подаёт Морзе как 53 не связанных между собой сочетания, которые надо выучить. Это не так. Каждый код — путь по двоичному дереву. Начните от корня: точка ведёт влево, тире вправо. Через один шаг вы у E или T, через два — у I, A, N или M. Каждый знак занимает своё место в этом дереве, а его код — просто маршрут, которым вы до него дошли."
        },
        {
          h: "Почему так быстрее",
          p: "На дереве вы запоминаете связи, а не отдельные элементы. E — одна точка. Добавьте ещё — получится I. Ещё одну — S. Ещё — H. Четыре знака и одна мысль: продолжать добавлять точки. С другой стороны то же самое: T, M и O — одно, два и три тире. Как только видна структура, таблица перестаёт быть стеной символов и становится картой, по которой можно идти."
        },
        {
          h: "Круг — точка, квадрат — тире",
          p: "В тренажёре форма каждого узла показывает, каким элементом вы в него попали. Круглый узел достигнут точкой, квадратный — тире. Тонкие линии — точки, толстые — тире. Код любого знака читается прямо с рисунка."
        },
        {
          h: "Точка и тире — это соотношение, а не фиксированная длительность",
          p: "Тире всегда втрое длиннее точки, а сама единица зависит от скорости передачи. При 12 словах в минуту точка равна 100 мс, тире — 300 мс; при 40 словах — 30 и 90 мс. Значит, быстрое тире короче медленной точки. Никто не расшифровывает, измеряя миллисекунды: вы подстраиваетесь под ритм передающего и оцениваете каждый элемент относительно него — как следуют за темпом музыкальной пьесы."
        },
        {
          h: "Счёт — это этап, а не цель",
          p: "Новичок слышит точку-тире-точку и восстанавливает путь до R. Выше примерно 20 слов в минуту времени на это нет, и опытные операторы перестают разбирать по элементам. Каждый знак приходит как единый звуковой образ, узнаваемый целиком — так узнают произнесённое слово. Поэтому проверенные методики с самого начала держат сами знаки на полной скорости и растягивают только паузы между ними: если замедлить знаки, образ распадается и человек застревает на счёте."
        },
        {
          h: "Как заниматься здесь",
          p: "Включите режим «Задание». Появится знак — найдите его на дереве и передайте. При ошибке верный путь загорится зелёным: именно в этот момент и происходит запоминание. Набор начинается с шести самых коротких кодов и расширяется по мере верных ответов, так что все 53 сразу перед вами не встанут. Прогресс хранится в браузере, поэтому завтра можно продолжить."
        }
      ]
    },
    about: {
      title: "О тренажёре азбуки Морзе",
      desc: "Что это за бесплатный тренажёр азбуки Морзе и как он работает.",
      h1: "О сайте",
      body: [
        "Это бесплатный браузерный инструмент для изучения азбуки Морзе по дереву сигналов. Без учётной записи, без установки и без платной версии.",
        "Большинство тренажёров исходит из того, что азбуку вы уже знаете, и тренируют скорость. Этот сделан для более ранней ступени: во время занятий весь набор знаков остаётся перед глазами одной схемой, и то, что ещё не запомнилось, можно посмотреть тут же.",
        "Поддерживаются международная азбука Морзе и японский набор вабун, интерфейс доступен на девяти языках. Длительности соответствуют ITU-R M.1677-1: точка в одну единицу, тире в три, а пауза перед принятием знака намеренно увеличена, чтобы новичок успел найти его на дереве.",
        "Исходный код открыт на GitHub."
      ]
    },
    privacy: {
      title: "Конфиденциальность",
      desc: "Что сайт сохраняет, а что нет.",
      h1: "Конфиденциальность",
      body: [
        "Сайт не запрашивает, не собирает и не передаёт никаких персональных данных. Нет ни учётной записи, ни входа, ни форм.",
        "Выбранный язык интерфейса и ваш прогресс хранятся в локальном хранилище вашего браузера. Они не покидают устройство и никому не видны, включая нас. Очистка данных браузера удаляет их.",
        "Сайт загружает шрифты из Google Fonts. Эти запросы передают ваш IP-адрес компании Google в соответствии с её политикой конфиденциальности. Всё остальное отдаётся с этого домена.",
        "Если в будущем появится реклама, эта страница будет обновлена до её запуска с точным указанием того, что собирает рекламный партнёр и как этим управлять."
      ]
    }
  },

  zh: {
    langName: "中文",
    nav: {
      tool: "练习器",
      chart: "码表",
      learn: "码树的原理",
      about: "关于本站",
      privacy: "隐私"
    },
    backToTool: "打开练习器",
    otherLangs: "其他语言",
    chart: {
      title: "莫尔斯电码表 — 字母、数字与标点完整对照",
      desc: "完整的莫尔斯电码表：每个字母、数字和标点的点划对照，另附日文和文码。免费，无需注册。",
      h1: "莫尔斯电码表",
      intro: "国际莫尔斯电码的全部字符，以及各自的点划顺序。点为一个单位长，划为三个。字符内部的间隔为一个单位，字符之间为三个，词与词之间为七个。",
      colChar: "字符",
      colCode: "电码",
      colDepth: "元素数",
      secLatin: "国际莫尔斯电码（拉丁）",
      secLatinNote: "依据 ITU-R M.1677-1 的字母、数字与标点。",
      secWabun: "和文电码（日文假名）",
      secWabunNote: "用于日文假名的莫尔斯电码。相同的点划组合，所对应的字符与拉丁码不同。",
      tip: "读表是慢办法。快办法是沿码树走：每打一个点或划就下降一层分叉，于是不必把 53 组图案各自背下来。"
    },
    learn: {
      title: "用码树学习莫尔斯电码的方法",
      desc: "为什么二叉树胜过死记 53 组图案，点与划如何分开每一条分支，以及如何练到把电码当成声音而不是去数。",
      h1: "码树的原理",
      secs: [
        {
          h: "莫尔斯电码是一棵树，不是一张清单",
          p: "多数码表把莫尔斯呈现为 53 组互不相干、需要硬背的图案。其实不然。每一个电码都是二叉树上的一条路径。从根出发：点走左枝，划走右枝。走一步到 E 或 T，走两步到 I、A、N、M。每个字符都在树上有其位置，而它的电码，不过是你走到那里的路线。"
        },
        {
          h: "为什么更快",
          p: "在树上，你记的是关系而不是条目。E 是一个点。再加一个点就是 I，再加是 S，再加是 H。四个字符，一个念头：继续加点。另一侧同理，T、M、O 分别是一划、二划、三划。看清结构之后，码表就不再是一堵符号墙，而成了一张可以走的地图。"
        },
        {
          h: "圆是点，方是划",
          p: "在练习器里，每个节点的形状表示把你带到那里的最后一个符号。圆形节点是由点抵达的，方形节点是由划抵达的。细线为点，粗线为划。任何字符的电码，看图就能直接读出来。"
        },
        {
          h: "点与划是比例，不是固定时长",
          p: "划的长度永远是点的三倍，而单位长度取决于发报速度。每分钟 12 词时，点为 100 毫秒、划为 300 毫秒；每分钟 40 词时则是 30 与 90 毫秒。也就是说，快速的划比慢速的点还短。没有人靠测量毫秒来解码：你会锁住对方的节奏，在这个节奏里做相对判断，就像跟随一首乐曲的拍子。"
        },
        {
          h: "数数只是阶段，不是终点",
          p: "初学者听到点—划—点，推出通往 R 的路径。超过每分钟约 20 词就没有这个余裕了，熟练的报务员不再逐个元素解码。每个字符作为一个整体的声音形状抵达，像听懂一个口语词那样被整体识别。这正是成熟学习法从一开始就让字符保持全速、只拉长字符之间间隔的原因：把字符放慢会让声音形状散掉，人就困在数数里出不来。"
        },
        {
          h: "在这里怎么练",
          p: "把模式切到「出题」。屏幕给出一个字符，你在码树上找到它并发出。答错时，正确路径会亮起绿色——真正记住的时刻恰恰在这里。范围从最短的六个电码开始，随着答对逐步扩大，不会一上来就面对全部 53 个。进度保存在浏览器里，明天可以接着来。"
        }
      ]
    },
    about: {
      title: "关于莫尔斯电码练习器",
      desc: "这个免费的莫尔斯电码练习器是什么，如何运作。",
      h1: "关于本站",
      body: [
        "莫尔斯电码练习器是一个免费的浏览器工具，通过沿码树前进来学习莫尔斯电码。无需账号、无需安装、没有付费墙。",
        "多数练习软件默认你已经记住了字母表，训练的是速度。本站面向的是在那之前的阶段：练习时整套电码始终作为一张图呈现在眼前，还没记住的可以当场查。",
        "支持国际莫尔斯电码与日文和文码，界面提供九种语言。时长比例遵循 ITU-R M.1677-1：点一个单位、划三个单位；而字符确定前的间隔被刻意放宽，好让初学者有时间在树上寻找。",
        "源代码在 GitHub 上公开。"
      ]
    },
    privacy: {
      title: "隐私",
      desc: "本站保存什么，不保存什么。",
      h1: "隐私",
      body: [
        "本站不索取、不收集、不传输任何个人信息。没有账号，没有登录，也没有表单。",
        "您选择的界面语言和练习进度保存在您自己浏览器的本地存储中。它们不会离开您的设备，任何人都看不到，包括我们。清除浏览器数据即会一并删除。",
        "本站从 Google Fonts 加载字体。该请求会依据 Google 自身的隐私政策向其透露您的 IP 地址。其余内容全部由本域名提供。",
        "若今后加入广告，本页将在广告上线之前更新，明确说明广告合作方收集哪些信息以及如何进行控制。"
      ]
    }
  },

  ko: {
    langName: "한국어",
    nav: {
      tool: "연습기",
      chart: "부호표",
      learn: "부호 나무의 원리",
      about: "사이트 소개",
      privacy: "개인정보"
    },
    backToTool: "연습기 열기",
    otherLangs: "다른 언어",
    chart: {
      title: "모스 부호표 — 알파벳·숫자·문장부호 전체",
      desc: "모스 부호 전체 표. 모든 글자와 숫자, 문장부호의 점과 선을 수록하고 일본어 와분 부호도 함께 실었습니다. 무료, 가입 불필요.",
      h1: "모스 부호표",
      intro: "국제 모스 부호의 모든 글자와 그 점·선의 정확한 배열. 점은 1단위, 선은 3단위 길이입니다. 글자 안의 간격은 1단위, 글자 사이는 3단위, 낱말 사이는 7단위입니다.",
      colChar: "글자",
      colCode: "부호",
      colDepth: "요소 수",
      secLatin: "국제 모스 부호(라틴)",
      secLatinNote: "ITU-R M.1677-1이 정한 알파벳·숫자·문장부호.",
      secWabun: "와분 부호(일본어 가나)",
      secWabunNote: "일본어 가나에 쓰는 모스 부호. 같은 점·선 배열이라도 라틴 부호와는 다른 글자에 대응합니다.",
      tip: "표를 외우는 것은 느린 길입니다. 빠른 길은 부호 나무를 따라가는 것입니다. 점이나 선을 하나 칠 때마다 갈래를 한 단 내려가므로, 53개의 배열을 따로 외울 필요가 없습니다."
    },
    learn: {
      title: "부호 나무로 모스 부호를 배우는 법",
      desc: "53개를 외우는 것보다 이진 나무가 나은 이유, 점과 선이 각 가지를 어떻게 나누는지, 그리고 세는 대신 소리의 모양으로 듣게 되기까지의 연습법.",
      h1: "부호 나무의 원리",
      secs: [
        {
          h: "모스 부호는 목록이 아니라 나무입니다",
          p: "대부분의 부호표는 모스를 서로 무관한 53개의 배열로 제시합니다. 그렇지 않습니다. 모든 부호는 이진 나무를 따라간 경로 그 자체입니다. 뿌리에서 시작해 점이면 왼쪽, 선이면 오른쪽으로. 한 걸음이면 E나 T, 두 걸음이면 I·A·N·M입니다. 모든 글자는 그 나무 어딘가에 있고, 그 부호란 거기까지 간 길일 뿐입니다."
        },
        {
          h: "왜 더 빠른가",
          p: "나무 위에서는 항목이 아니라 관계를 익히게 됩니다. E는 점 하나. 하나 더하면 I, 또 더하면 S, 또 더하면 H입니다. 네 글자가 '점을 계속 더한다'는 하나의 생각으로 묶입니다. 반대쪽도 같아서 T·M·O는 선이 하나·둘·셋입니다. 구조가 보이는 순간 부호표는 기호의 벽이 아니라 걸어 다닐 수 있는 지도가 됩니다."
        },
        {
          h: "동그라미는 점, 네모는 선",
          p: "연습기에서는 각 마디의 모양이 그곳에 이르게 한 마지막 부호를 나타냅니다. 동그란 마디는 점으로, 네모난 마디는 선으로 도달한 것입니다. 가는 선은 점, 굵은 선은 선입니다. 어떤 글자의 부호든 그림에서 바로 읽어낼 수 있습니다."
        },
        {
          h: "점과 선은 비율이지 고정된 길이가 아닙니다",
          p: "선은 언제나 점의 세 배이고, 그 1단위의 길이는 송신 속도에 따라 달라집니다. 분당 12낱말이면 점은 100밀리초, 선은 300밀리초. 분당 40낱말이면 30과 90밀리초입니다. 즉 빠른 송신의 선이 느린 송신의 점보다 짧습니다. 아무도 밀리초를 재어 해독하지 않습니다. 보내는 쪽의 리듬에 올라타 그 안에서 상대적으로 판단합니다. 음악의 박자를 따라가는 것과 같습니다."
        },
        {
          h: "세는 것은 거쳐 가는 단계일 뿐입니다",
          p: "초보자는 점-선-점을 듣고 R까지의 길을 더듬습니다. 분당 20낱말을 넘으면 그럴 여유가 없어지고, 숙련자는 요소 단위의 해독을 그만둡니다. 글자 하나가 하나의 소리 모양으로 통째로 도착해, 말소리를 알아듣듯 통째로 인식됩니다. 검증된 학습법이 글자 자체는 처음부터 빠르게 두고 글자 사이의 간격만 늘리는 이유가 여기에 있습니다. 글자를 늦추면 소리의 모양이 흩어져 세는 방식에서 벗어나지 못합니다."
        },
        {
          h: "여기서 연습하는 법",
          p: "모드를 '출제'로 바꾸세요. 글자가 제시되면 부호 나무에서 찾아 보내면 됩니다. 틀리면 정답 경로가 초록으로 켜지는데, 사실 그때가 가장 잘 외워지는 순간입니다. 범위는 가장 짧은 부호 여섯 자에서 시작해 맞힐수록 넓어지므로 처음부터 53자를 상대하지 않습니다. 진도는 브라우저에 남으니 내일 이어서 할 수 있습니다."
        }
      ]
    },
    about: {
      title: "모스 부호 연습기 소개",
      desc: "이 무료 모스 부호 연습기가 무엇이고 어떻게 동작하는지.",
      h1: "사이트 소개",
      body: [
        "부호 나무를 따라가며 모스 부호를 익히는 무료 브라우저 도구입니다. 계정도, 설치도, 유료 버전도 없습니다.",
        "대부분의 연습 프로그램은 부호를 이미 외웠다고 전제하고 속도를 훈련합니다. 이 도구는 그 이전 단계를 위한 것입니다. 연습하는 동안 부호 전체가 한 장의 그림으로 눈앞에 있으므로, 아직 외우지 못한 것은 그 자리에서 찾아볼 수 있습니다.",
        "국제 모스 부호와 일본어 와분 부호를 지원하며 화면은 아홉 개 언어로 볼 수 있습니다. 시간 비율은 ITU-R M.1677-1을 따라 점 1단위, 선 3단위이며, 글자가 확정되기까지의 간격만은 나무에서 찾을 시간을 주기 위해 의도적으로 넓혀 두었습니다.",
        "소스 코드는 GitHub에 공개되어 있습니다."
      ]
    },
    privacy: {
      title: "개인정보",
      desc: "이 사이트가 저장하는 것과 저장하지 않는 것.",
      h1: "개인정보",
      body: [
        "이 사이트는 어떤 개인정보도 요구하지 않고, 수집하지 않으며, 전송하지 않습니다. 계정도 로그인도 입력란도 없습니다.",
        "선택한 표시 언어와 연습 진도는 사용자의 브라우저 로컬 저장소에 보관됩니다. 기기 밖으로 나가지 않으며 운영자를 포함해 누구도 볼 수 없습니다. 브라우저 데이터를 지우면 함께 삭제됩니다.",
        "이 사이트는 Google Fonts에서 글꼴을 불러옵니다. 그 요청으로 인해 Google의 개인정보처리방침에 따라 IP 주소가 Google에 전달됩니다. 그 밖의 모든 것은 이 도메인에서 제공됩니다.",
        "앞으로 광고를 게재하게 되면, 게재 전에 이 페이지를 갱신하여 광고 제공자가 무엇을 수집하는지와 이를 어떻게 제어할 수 있는지를 명시하겠습니다."
      ]
    }
  }
};
