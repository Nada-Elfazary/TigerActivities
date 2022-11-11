import urllib.parse

def _parse_help(arg_str):
    if '=' not in arg_str:
        name = urllib.parse.unquote_plus(arg_str)
        return (name, None)
    name, value = arg_str.split('=')
    name = urllib.parse.unquote_plus(name)
    value = urllib.parse.unquote_plus(value)
    return (name, value)

def parse_args(arg_str):
    args = {}
    arg_strs = arg_str.split('&')
    for arg_str in arg_strs:
        name, value = _parse_help(arg_str)
        args[name] = value
    return args

def _test():
    arg_str = 'name=Reuben&age=21&location=San+Francisco'
    args = parse_args(arg_str)
    for name in args:
        print('{}: {}'.format(name, args[name]))

if __name__ == '__main__':
    _test()