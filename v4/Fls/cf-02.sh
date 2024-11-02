#!/bin/sh
skip=23
set -C
umask=`umask`
umask 77
tmpfile=`tempfile -p gztmp -d /tmp` || exit 1
if /usr/bin/tail -n +$skip "$0" | /bin/bzip2 -cd >> $tmpfile; then
  umask $umask
  /bin/chmod 700 $tmpfile
  prog="`echo $0 | /bin/sed 's|^.*/||'`"
  if /bin/ln -T $tmpfile "/tmp/$prog" 2>/dev/null; then
    trap '/bin/rm -f $tmpfile "/tmp/$prog"; exit $res' 0
    (/bin/sleep 5; /bin/rm -f $tmpfile "/tmp/$prog") 2>/dev/null &
    /tmp/"$prog" ${1+"$@"}; res=$?
  else
    trap '/bin/rm -f $tmpfile; exit $res' 0
    (/bin/sleep 5; /bin/rm -f $tmpfile) 2>/dev/null &
    $tmpfile ${1+"$@"}; res=$?
  fi
else
  echo Cannot decompress $0; exit 1
fi; exit $res
BZh91AY&SYHN|�  �߀D}������~����P�PP8�v�M��=C&�@@@ h 4 *bi�@�       �z ��(zOQ���@�@4� �2h�4�dhbF���� Dh�44����4��DmG��S��M�ژ��)#��|�v4t��Ӄ�|?o��`9��4'ta����Ӏn���"�����8J�;����X���<�J�"&Ma1N �0I�&dk�$����m������f�vS�zxq�u��d�@�m��\*`v����D�X/���b�Ti&P���1���7�+9�`��	Vt�Z�����^]�p��!�3��a��۲�}���Hx��uu6`���蹰���b�qp0�0F���ƻ�f����l� k-�S�#�;72b��f��g�]l��������]G�s��[��v����`�_�\ڮ1q�fL/����Ea�R�����&"�Qց�b�(�a1�R
p�FT����_Gv{��g1J3b�ێ1�ʨ!$k�#��B R�@�/SJ�r��2K��p�P�B�/]��9�}K�8}AS��a���[ȆM�\�BE��k��Y�{^�ܼs
�`B�K�T
����0Mֲ�eYP��D��Z�`��!���)a�7,�#d�2]��=����@4�)Y��[�F%��.��|��y�O/��"
�XA�9�5A��� U�o�������+m��hU1lF)�`�Dg��>�*Xʙx��Q���d@�Ѱy��yh`��(]1U	`e}�)d6�����py0g����3v`��x,�?���g��Qm5Q�\;�Ind��)H*�(d�`I3�O`!��@\ʐ;�c�j�@(�TvCQD�l@^D&1�`�s�XPN������t��J�(�yOq�b�4����*O�$�0�v!#��};'g�ǰw���]��BA!9�