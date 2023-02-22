from django import forms
from app_cms.models import LinkInfo

class LinkTypeForm(forms.Form):
    # error_css_class = 'error' 
    # required_css_class = 'form-control'
    linkType = forms.CharField(label="Link type Name", max_length=100)

    def validate():
        pass


class LinkInfoForm(forms.ModelForm):

    class Meta:
        model = LinkInfo
        fields = "__all__"