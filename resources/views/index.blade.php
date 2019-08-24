<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>QHCoin</title>

        <!-- Fonts -->

        <!-- Styles -->
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <ul class="flex border-b">
            <li class="-mb-px mr-1">
                <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Active</a>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-gray-400 font-semibold" href="#">Tab</a>
            </li>
        </ul>
        <div id="app">
        </div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
