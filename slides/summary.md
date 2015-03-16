# Art direction
* Do it with picture
* It's totally worth it **if** you have the requirement
* You can solve for resolution switching at the same time by using `srcset` on the `<picture>`'s `<source>` elements.
* Read up, there's a fair bit to consider on this.

# Should I do this now?
* Yes. Unequivocally, yes.

# Should I polyfill for older browsers?
* Yes. Probably, under most circumstances.
* Caveats:
 * Fallback images will stop working
 * Strict standards compliance is jettisoned.
