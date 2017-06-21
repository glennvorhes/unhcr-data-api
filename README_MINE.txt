Issue resolution with karma plugin not reloading from source.

Solved by using solution found at:

https://youtrack.jetbrains.com/issue/WEB-21308#comment=27-1411115

workaround is setting refresh: true in runWithConfig() args in
\plugins\js-karma\js_reporter\karma-intellij\lib\intellijRunner.js , line 75


~/.PyCharm2017.1/config/plugins
