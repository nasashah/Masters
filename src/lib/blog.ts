export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  paragraphs: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "hot-towel-explained",
    title: "The Hot Towel, Explained",
    date: "2026-06-04",
    excerpt:
      "It looks like a small gesture. It is doing more work than you think.",
    paragraphs: [
      "A hot towel isn't a garnish. It's preparation. Heat and steam open the pore, soften the hair at the root, and relax the muscle underneath, which is the entire reason a straight razor can move as close as it does without a fight.",
      "At Masters, we work in stages: a first towel to soften, a second to lift the lather, a third, cooler, to close things back down. Skip a stage and the shave still happens. It just doesn't feel like this.",
      "The by-product, of course, is the part people actually remember: thirty seconds where your shoulders drop and the day stops asking anything of you.",
    ],
  },
  {
    slug: "how-often-should-you-get-a-haircut",
    title: "How Often You Should Actually Get a Haircut",
    date: "2026-05-18",
    excerpt:
      "The honest answer depends on your hair, not the calendar you think you should follow.",
    paragraphs: [
      "Three to four weeks is the range we give most guys, but it's a starting point, not a rule. Fine, fast-growing hair loses its line sooner. Coarser or curlier hair can stretch a visit longer and still look sharp.",
      "The real signal isn't the date on your last visit. It's the fade. Once the line at your neck and temples starts to blur, you've got a week, maybe less, before it looks less like a style and more like neglect.",
      "If it's been two to three months, don't skip the cut and hope for the best. Ask for the Signature Transformation. It's built exactly for this: bringing a grown-out style back to a shape worth keeping.",
    ],
  },
  {
    slug: "beard-line-straight-razor",
    title: "Why Your Beard Line Needs a Straight Razor",
    date: "2026-04-02",
    excerpt:
      "Clippers can shape a beard. Only a blade can finish one.",
    paragraphs: [
      "Clippers are fast, and fast is fine for the bulk of a beard trim. But the edge, the exact line where beard ends and neck begins, is where a clipper guard starts to guess. A straight razor doesn't guess.",
      "A clean straight razor line does something subtle to the whole face: it draws a boundary sharp enough that the eye reads the entire beard as intentional, not just grown.",
      "It's the difference between the Standard Beard Trim and the Deluxe: clippers get you clean, a blade gets you defined.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
