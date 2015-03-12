## <code>srcset</code>


<pre><code data-trim data-noescape>
&lt;img
    src=<span class="fragment-replace"><span class="fragment fade-out" data-fragment-index="2">"/images/wiki-commons/04-large.jpg"</span><span class="fragment fade-in fragment-replacement" data-fragment-index="2">"test"</span></span>
    alt="A man showing three visitors to The House that Jack Built"
    <span class="fragment">srcset="04-tiny.jpg   300w,
            04-small.jpg  600w,
            04-medium.jpg 800w,
            04-large.jpg  1000w"</span>
    <span class="fragment">sizes="50vw"</span>>
</code></pre>



note:
- `srcset` is a fine place to start beginning with responsive imagery. I
  think it gets you the most bang for your buck.
- In fact, there are good arguments to be made that you should not be using
  <picture> most of the time.
