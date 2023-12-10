<?php
use Illuminate\Support\Facades\DB;

if (!function_exists('translations')) {
    function translations($json)
    {
        if (!file_exists($json)) {
            return [];
        }
        return json_decode(file_get_contents($json), true);
    }
}

if (!function_exists('generateInitial')) {
    function generateInitial(string $name): string
    {
        $words = explode(' ', $name);
        if (count($words) >= 2) {
            return mb_strtoupper(
                mb_substr($words[0], 0, 1, 'UTF-8') .
                mb_substr(end($words), 0, 1, 'UTF-8'),
                'UTF-8'
            );
        }
        return makeInitialsFromSingleWord($name);
    }
}

if (!function_exists('makeInitialsFromSingleWord')) {
    function makeInitialsFromSingleWord(string $name): string
    {
        preg_match_all('#([A-Z]+)#', $name, $capitals);
        if (count($capitals[1]) >= 2) {
            return mb_substr(implode('', $capitals[1]), 0, 2, 'UTF-8');
        }
        return mb_strtoupper(mb_substr($name, 0, 2, 'UTF-8'), 'UTF-8');
    }
}

if (!function_exists('initials')) {
    function initials($str): string
    {
        $ret = '';
        foreach (explode(' ', $str) as $word)
            $ret .= strtoupper($word[0]);
        return $ret;
    }
}

if (!function_exists('generateUserCode')) {
    function generateUserCode(string $initial)
    {
        $six_digit_random_number = random_int(100000, 999999);
        $concatCode = $initial . $six_digit_random_number;
        $exists = DB::table('users')->where('user_code', $concatCode)->exists();
        if ($exists) {
            generateUserCode($initial);
        } else {
            return $concatCode;
        }
    }
}

if (!function_exists('time_elapsed_string')) {
    function time_elapsed_string($datetime, $full = false)
    {
        $locale = app()->getLocale();

        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);
        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;
        if ($locale == 'ar') {
            $string = array(
                'y' => 'سنة',
                'm' => 'شهر',
                'w' => 'أسبوع',
                'd' => 'يوم',
                'h' => 'ساعة',
                'i' => 'دقيقة',
                's' => 'ثانية',
            );
        } else {
            $string = array(
                'y' => 'year',
                'm' => 'month',
                'w' => 'week',
                'd' => 'day',
                'h' => 'hour',
                'i' => 'minute',
                's' => 'second',
            );
        }

        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                if ($locale == 'ar') {
                    $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? '' : '');
                } else {
                    $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
                }
            } else {
                unset($string[$k]);
            }
        }
        if (!$full) {
            $string = array_slice($string, 0, 1);
        }
        if ($locale == 'ar') {
            return $string ? implode(', ', $string) . ' منذ' : 'الآن';
        } else {
            return $string ? implode(', ', $string) . ' ago' : 'just now';
        }

    }
}

if (!function_exists('time_remaining_string')) {
    function time_remaining_string($datetime, $full = false)
    {
        $locale = app()->getLocale();

        $now = new DateTime;
        $next = new DateTime($datetime);
        $diff = $now->diff($next);

        if ($diff->days > 1) {
            if ($locale == 'ar') {
                return $diff->days . ' أيام';
            } else {
                return $diff->days . ' days';
            }
        } else {
            if ($locale == 'ar') {
                return $diff->days . ' يوم';
            } else {
                return $diff->days . ' day';
            }
        }
    }
}