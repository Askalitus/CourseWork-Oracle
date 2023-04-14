PGDMP     7                    {            course_project    15.1    15.1 '    '           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            (           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            )           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            *           1262    16424    course_project    DATABASE     �   CREATE DATABASE course_project WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE course_project;
                postgres    false            �            1259    16692    task    TABLE     i  CREATE TABLE public.task (
    id integer NOT NULL,
    description character varying NOT NULL,
    cabinet integer NOT NULL,
    applicant integer NOT NULL,
    worker integer,
    status character varying NOT NULL,
    "startDate" timestamp without time zone DEFAULT now() NOT NULL,
    "endDate" timestamp without time zone,
    comment character varying
);
    DROP TABLE public.task;
       public         heap    postgres    false            �            1259    16691    task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.task_id_seq;
       public          postgres    false    220            +           0    0    task_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;
          public          postgres    false    219            �            1259    16613    user    TABLE       CREATE TABLE public."user" (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying,
    surename character varying,
    patronymic character varying
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16612    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    217            ,           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    216            �            1259    16754 
   user_login    TABLE     �   CREATE TABLE public.user_login (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.user_login;
       public         heap    postgres    false            �            1259    16753    user_login_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.user_login_id_seq;
       public          postgres    false    222            -           0    0    user_login_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_login_id_seq OWNED BY public.user_login.id;
          public          postgres    false    221            �            1259    16440    worker    TABLE       CREATE TABLE public.worker (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying,
    surename character varying,
    patronymic character varying
);
    DROP TABLE public.worker;
       public         heap    postgres    false            �            1259    16628    worker_id_seq    SEQUENCE     v   CREATE SEQUENCE public.worker_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.worker_id_seq;
       public          postgres    false    214            .           0    0    worker_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.worker_id_seq OWNED BY public.worker.id;
          public          postgres    false    218            �            1259    16445    worker_login    TABLE     �   CREATE TABLE public.worker_login (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL
);
     DROP TABLE public.worker_login;
       public         heap    postgres    false            �            1259    16762    worker_login_id_seq    SEQUENCE     |   CREATE SEQUENCE public.worker_login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.worker_login_id_seq;
       public          postgres    false    215            /           0    0    worker_login_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.worker_login_id_seq OWNED BY public.worker_login.id;
          public          postgres    false    223            �           2604    16695    task id    DEFAULT     b   ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);
 6   ALTER TABLE public.task ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            }           2604    16616    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    16757    user_login id    DEFAULT     n   ALTER TABLE ONLY public.user_login ALTER COLUMN id SET DEFAULT nextval('public.user_login_id_seq'::regclass);
 <   ALTER TABLE public.user_login ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            y           2604    16629 	   worker id    DEFAULT     f   ALTER TABLE ONLY public.worker ALTER COLUMN id SET DEFAULT nextval('public.worker_id_seq'::regclass);
 8   ALTER TABLE public.worker ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    214            |           2604    16763    worker_login id    DEFAULT     r   ALTER TABLE ONLY public.worker_login ALTER COLUMN id SET DEFAULT nextval('public.worker_login_id_seq'::regclass);
 >   ALTER TABLE public.worker_login ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    215            !          0    16692    task 
   TABLE DATA           t   COPY public.task (id, description, cabinet, applicant, worker, status, "startDate", "endDate", comment) FROM stdin;
    public          postgres    false    220   �*                 0    16613    user 
   TABLE DATA           Z   COPY public."user" (id, "createdAt", "updatedAt", name, surename, patronymic) FROM stdin;
    public          postgres    false    217   �*       #          0    16754 
   user_login 
   TABLE DATA           9   COPY public.user_login (id, login, password) FROM stdin;
    public          postgres    false    222   �*                 0    16440    worker 
   TABLE DATA           Z   COPY public.worker (id, "createdAt", "updatedAt", name, surename, patronymic) FROM stdin;
    public          postgres    false    214   X+                 0    16445    worker_login 
   TABLE DATA           ;   COPY public.worker_login (id, login, password) FROM stdin;
    public          postgres    false    215   �+       0           0    0    task_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.task_id_seq', 2, true);
          public          postgres    false    219            1           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 4, true);
          public          postgres    false    216            2           0    0    user_login_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_login_id_seq', 2, true);
          public          postgres    false    221            3           0    0    worker_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.worker_id_seq', 2, true);
          public          postgres    false    218            4           0    0    worker_login_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.worker_login_id_seq', 3, true);
          public          postgres    false    223            �           2606    16620 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    217            �           2606    16761 )   user_login PK_dea1292c6882b56142e9d6f9a99 
   CONSTRAINT     i   ALTER TABLE ONLY public.user_login
    ADD CONSTRAINT "PK_dea1292c6882b56142e9d6f9a99" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.user_login DROP CONSTRAINT "PK_dea1292c6882b56142e9d6f9a99";
       public            postgres    false    222            �           2606    16700 #   task PK_fb213f79ee45060ba925ecd576e 
   CONSTRAINT     c   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.task DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e";
       public            postgres    false    220            �           2606    16449    worker_login worker_login_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.worker_login
    ADD CONSTRAINT worker_login_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.worker_login DROP CONSTRAINT worker_login_pkey;
       public            postgres    false    215            �           2606    16444    worker worker_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.worker
    ADD CONSTRAINT worker_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.worker DROP CONSTRAINT worker_pkey;
       public            postgres    false    214            !      x������ � �         %   x�3�4202�50�54W00�#�b1~����� %c
R      #   R   x�3�,I-.1�T1JT14P)+v�I�L7K1K�/�r��NJK�1ȉ�w��L�*u*���/�L,rr4�6
57q����� ^&         /   x�3�4202�50�52P04�21�20�31��0��'�A\1z\\\ ��2         a   x�3�LJMMJ-�44261�2�,I-.1�T1JT14PI3	37
)�ur30-v��-L/�	2���t	+�	��HK5�1I��2N)�w�M����� Y4     