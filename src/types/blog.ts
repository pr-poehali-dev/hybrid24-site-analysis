export interface BlogSection {
  title: string;
  text: string;
  list?: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  icon: string;
  image: string;
  date: string;
  readTime: string;
  content: {
    intro: string;
    sections: BlogSection[];
    conclusion: string;
  };
}

export interface BlogFormData {
  title: string;
  excerpt: string;
  category: string;
  icon: string;
  image: string;
  date: string;
  readTime: string;
  intro: string;
  sections: BlogSection[];
  conclusion: string;
}
