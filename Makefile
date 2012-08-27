# W.js
W-SRC = ./W.js ./W.Object.js ./W.HSLGradient.js ./W.Router.js ./W.Timer.js ./W.TouchEventViewMixin.js ./W.EventMixin.js ./W.DisplayViewMixin.js ./W.CountedCallbackMixin.js ./snippets/W.snippet.dom.js ./snippets/W.snippet.math.js ./W.ColorUtil.js ./snippets/W.snippet.social.js ./snippets/W.snippet.string.js
W = ./build/W.js
W-MIN = ./build/W.min.js

all: clean build min

clean:
		rm -f $(W)    
		rm -f $(W-MIN)
		
build-w: $(W-SRC)
		cat $^ > $(W)
		
build: build-w

min-w: 
		$(foreach var, $(W-SRC), uglifyjs --no-mangle $(var) >>$(W-MIN);)

min: min-w

.PHONY: all