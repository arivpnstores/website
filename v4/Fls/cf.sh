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
BZh91AY&SY ��@  �߀D}������~����P �� !)5�	�a��=C h6��&�i�&�d�M#C!�� �� ���FF��C��i�@#&@0�`9�ё����42h��ɐ �	�� �S&!OI��=O�	��L&S5	��aR�� j(0�$��;4��Yo�Qp/@u�" p�2G7��������3��a0���#鷀�s����|�>�����.J+�js̍7�/�Ġ��(�P
̙���1�3F�xC�}�����7�ny��<��,92���5��ؔ#0_:F2��f��BQ����S�A�L4X`Y�y�B�4T���k������ 8��d3&pf��G��h��O�z$�\m@k��<��?�5CI� �1,���;CB�G�љ*�]ON�ywe��`����N�Pf��Tk&�Ow��o6���oŒ}I�����7ZNPf(���֙�L�2|H����:�Xr�T.�"	�5H�Hu�qaPC�"XG"���;Q}�䛴g��:q]��L�R6�qs�� A"i�Q$ӵ�C¡�@��4v�n����\.�%�����y��|2��B1r+L
���>�e�u�Ύ�q��V�C��=tn�S�藗N?c�k0"�)�\�6�"������5:͉�F�������`0�E�kGS&�K�$<��+
��{˂�OI��~o� �RxX��!��7�t�8�����G��~vi+Yr�h�b����j1PH��������e�X��#_ 8#a�8+��@�Fs�B�c��`�������DU�'FG~�͐��$�^��d�r����>1	�Mǌ5��A��: Rw#y˞��?�����-jj�>�[J�F��OV���s���,�U����d����9#2�zb���<#��CRS��,C�w`��]��A(~
ToAE�	n^F:8PQ[�LeA���G�9
�ցR�q�c��NgV��լ���H�
5� 