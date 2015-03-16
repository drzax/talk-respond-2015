## <code>srcset</code>


<pre><code data-trim data-noescape>
&lt;img src="http://placehold.it/500x500" alt="A placeholder"
     <span class="fragment">sizes="(max-width: 20em) 100vw,
            (max-width: 50em) 50vw,
            960px"</span>
     srcset="http://placehold.it/500x500 500w,
             http://placehold.it/750x750 750w,
             http://placehold.it/1000x1000 1000w">
</code></pre>


note:
- `srcset` is a fine place to start beginning with responsive imagery. I
  think it gets you the most bang for your buck.
- In fact, there are good arguments to be made that you should not be using
  <picture> most of the time.
